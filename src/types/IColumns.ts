import { IIdentifier } from './IIdentifier';

export interface IColumn {
	name: string;
	type: string;
	isNullable: boolean;
}

export interface IColumns extends IIdentifier {
	columns: IColumn[];
}
