import {Prisma} from "@prisma/client";

export interface JwtDto {
    userId: Prisma.UserWhereUniqueInput
    /**
     * Issued at
     */
    iat: number;
    /**
     * Expiration time
     */
    exp: number;
}