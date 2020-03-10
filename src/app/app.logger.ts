import { LoggerService } from '@nestjs/common';
import { createLogger, format, Logger, transports } from 'winston';

const { combine, timestamp, label, printf } = format;

const projectFormat = printf(opt => `${opt.timestamp} [${opt.level.toUpperCase()}] ${opt.label} - ${opt.message}`);

export class AppLogger implements LoggerService {
	private logger: Logger;

	constructor(name?: string) {
		this.logger = createLogger({
			level: process.env.APP_LOGGER_LEVEL,
			format: combine(label({ label: name }), timestamp(), projectFormat),
			transports: [new transports.Console()]
		});
	}

	public exception(error: Error): void {
		this.error(error.message, error.stack);
	}

	public error(message: string, trace: string): void {
		message += '\r\n' + trace;
		this.logger.error(message);
	}

	public warn(message: string): void {
		this.logger.warn(message);
	}

	public log(message: string): void {
		this.logger.info(message);
	}

	public verbose(message: string): void {
		this.logger.verbose(message);
	}

	public debug(message: string): void {
		this.logger.debug(message);
	}

	public silly(message: string): void {
		this.logger.silly(message);
	}
}
