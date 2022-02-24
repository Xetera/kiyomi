import {Account} from '@prisma/client';

export type Done = (err: Error, account: Account) => void;