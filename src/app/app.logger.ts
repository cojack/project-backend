import {LoggerService} from '@nestjs/common';
import {createLogger, format, Logger, transports} from 'winston';

const {combine, timestamp, label, printf} = format;

const projectFormat = printf(({level, message, label, timestamp}) => {
	return `${timestamp} [${level.toUpperCase()}] ${label} - ${message}`;
});

export class AppLogger implements LoggerService {
	private logger: Logger;

	constructor(name?: string) {
		this.logger = createLogger({
			level: process.env.APP_LOGGER_LEVEL,
			format: combine(
				label({label: name}),
				timestamp(),
				projectFormat
			),
			transports: [
				new transports.Console()
			]
		});
	}

	error(message: string, trace: string) {
		this.logger.error(message, trace);
	}

	warn(message: string) {
		this.logger.warn(message);
	}

	log(message: string) {
		this.logger.info(message);
	}

	verbose(message: string) {
		this.logger.verbose(message);
	}

	debug(message: string) {
		this.logger.debug(message);
	}

	silly(message: string) {
		this.logger.silly(message);
	}
}
