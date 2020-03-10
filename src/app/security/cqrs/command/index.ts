export * from './token';
import { RemoveTokenHandler, StoreTokenHandler } from './token';

export const CommandHandlers = [StoreTokenHandler, RemoveTokenHandler];
