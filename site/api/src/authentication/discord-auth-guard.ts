import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {GqlExecutionContext} from "@nestjs/graphql";

@Injectable()
export class DiscordAuthGuard extends AuthGuard('discord') {
    async canActivate(context: ExecutionContext) {
        const activate = (await super.canActivate(context)) as boolean;
        const request = context.switchToHttp().getRequest();
        await super.logIn(request);
        return activate;
    }
}

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        return req.isAuthenticated();
    }
}

@Injectable()
export class GraphQLAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req.user;
    }
}