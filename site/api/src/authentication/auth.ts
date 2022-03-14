import {Prisma, User as UserModel} from '@prisma/client';
import {UserDetails} from "../utils/types";


export interface AuthenticationProvider {
    validateUser(details: UserDetails);
    createUser(details: UserDetails);
    findUser(discordId: number): Promise<UserModel | undefined>;
}
