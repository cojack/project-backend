import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import { Request, Response } from 'express';
import { iterate } from 'iterare';

@Catch(Array)
export class ClassValidatorFilter extends BaseExceptionFilter {
	public catch(exceptions: Array<ValidationError>, host: ArgumentsHost): void {
		const filtered = iterate(exceptions)
			.filter(exception => exception instanceof ValidationError)
			.toArray();

		if (!filtered.length) {
			return;
		}

		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		const status = HttpStatus.UNPROCESSABLE_ENTITY;

		response
			.status(status)
			.json({
				statusCode: status,
				error: 'Validation',
				message: filtered,
				timestamp: new Date().toISOString(),
				path: request.url
			});
	}
}
