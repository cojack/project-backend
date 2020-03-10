import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import nodemailer from 'nodemailer';
import { WelcomeMailCommand } from '../../../user/cqrs/command';
import { UserEntity } from '../../../user/entity';

@CommandHandler(WelcomeMailCommand)
export class WelcomeMailHandler implements ICommandHandler<WelcomeMailCommand> {
	public async execute(command: WelcomeMailCommand): Promise<void> {
		const { user } = command;
		await this.sendMail(user);
	}

	private async sendMail(user: UserEntity): Promise<void> {
		// Generate test SMTP service account from ethereal.email
		// Only needed if you don't have a real mail account for testing
		const testAccount = await nodemailer.createTestAccount();

		// create reusable transporter object using the default SMTP transport
		const transporter = nodemailer.createTransport({
			host: 'smtp.ethereal.email',
			port: 587,
			secure: false, // true for 465, false for other ports
			auth: {
				user: testAccount.user, // generated ethereal user
				pass: testAccount.pass // generated ethereal password
			}
		});

		// send mail with defined transport object
		const info = await transporter.sendMail({
			from: '"Fred Foo 👻" <foo@example.com>', // sender address
			to: user.email, // list of receivers
			subject: 'Hello ✔', // Subject line
			text: 'Hello world?', // plain text body
			html: '<b>Hello world?</b>' // html body
		});

		console.log('Message sent: %s', info.messageId);
		// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

		// Preview only available when sending through an Ethereal account
		console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
		// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
	}
}
