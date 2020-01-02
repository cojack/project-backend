import { CrudActions } from '@nestjsx/crud';

export interface CrudSubjectInterface {
	resource: string;
	body: any;
	query: any;
	params: any;
}
