export * from './register/welcome-mail.command';
import { RegisterHandler } from './register/register.handler';
import { LoginHandler } from './login/login.handler';

export const CommandHandlers = [RegisterHandler, LoginHandler];
