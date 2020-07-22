import { Strategy } from 'passport-strategy';
import { Request } from 'express';

export interface RedirectStrategyOptions {
	cookieName: string;
	signed: boolean;
	redirectOnFail: string;
}

export class RedirectStrategy extends Strategy {
	public readonly name = 'redirect';
	private readonly verify: (req, cb) => void;
	private readonly cookieName: string;
	private readonly signedCookie: boolean;
	private readonly redirectOnFail: string;

	constructor(options: RedirectStrategyOptions, callback: (req, cb) => void) {
		super();
		this.verify = callback;
		this.cookieName = options.cookieName;
		this.redirectOnFail = options.redirectOnFail;
		this.signedCookie = options.signed ?? false;
	}

	public authenticate(req: Request): void {
		let token;
		if (this.signedCookie) {
			if (req.signedCookies[this.cookieName]) {
				token = req.signedCookies[this.cookieName];
			}
		} else {
			if (req.cookies[this.cookieName]) {
				token = req.cookies[this.cookieName];
			}
		}

		if (!token) {
			return this.onFail(req);
		}

		this.verify(token, (err, user) => {
			if (err || !user) {
				return this.onFail(req);
			}
			this.success(user);
		});
	}

	private onFail(req: Request): void {
		req.res.clearCookie(this.cookieName);
		this.redirect(this.redirectOnFail);
	}
}
