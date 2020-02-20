import {LoggerService} from '@nestjs/common';
import {createLogger, format, Logger, transports} from 'winston';

const {combine, timestamp, label, printf} = format;

const projectFormat = printf(opt => `${opt.timestamp} [${opt.level.toUpperCase()}] ${opt.label} - ${opt.message}`);

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

	exception(error: Error) {
		this.error(error.message, error.stack);
	}

	error(message: string, trace: string) {
		message += '\r\n' + trace;
		this.logger.error(message);
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
