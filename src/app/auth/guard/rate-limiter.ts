import { CanActivate, ExecutionContext, HttpException, Inject, Injectable } from '@nestjs/common';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { Request, Response } from 'express';
import { RedisClient } from 'redis';
import { HttpStatus } from '@nestjs/common/enums';
import { REDIS_CLIENT } from '../../core';
import Fingerprint from 'express-fingerprint/lib';

@Injectable()
export class RateLimiter implements CanActivate {

	private readonly fingerprint = Fingerprint();
	private readonly rateLimiterOpts = {
		storeClient: this.redisClient,
		keyPrefix: 'middleware',
		points: 3, // 10 requests
		duration: 10 // per 1 second by IP
	};
	private readonly rateLimiter = new RateLimiterRedis(this.rateLimiterOpts);

	constructor(@Inject(REDIS_CLIENT) private readonly redisClient: RedisClient) {
	}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const response: Response = context.switchToHttp().getResponse();
		let rateLimiterRes;
		try {
			const request: Request = context.switchToHttp().getRequest();
			const hash = await this.calculateRequestHash(request, response);
			rateLimiterRes = await this.rateLimiter.consume(hash);
			return true;
		} catch (err) {
			rateLimiterRes = err;
			throw new HttpException('Too Many Requests', HttpStatus.TOO_MANY_REQUESTS);
		} finally {
			this.setLimitHeaders(rateLimiterRes, response);
		}
	}

	private calculateRequestHash(request: Request, response: Response): Promise<string> {
		return new Promise((resolve, reject) => {
			this.fingerprint(request, response, err => {
				if (err) return reject(err);
				resolve(request.fingerprint.hash);
			});
		})
	}

	private setLimitHeaders(rateLimiterRes, response): void {
		response.setHeader('Retry-After', rateLimiterRes.msBeforeNext / 1000);
		response.setHeader('X-RateLimit-Limit', this.rateLimiterOpts.points);
		response.setHeader('X-RateLimit-Remaining', rateLimiterRes.remainingPoints);
		response.setHeader('X-RateLimit-Reset', new Date(Date.now() + rateLimiterRes.msBeforeNext));
	}
}
