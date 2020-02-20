export * from './access-control';

import { GetTokenHandler } from './token/get-token.handler';
import { GetGrantsHandler } from './access-control';

export const QueryHandlers = [GetGrantsHandler, GetTokenHandler];
