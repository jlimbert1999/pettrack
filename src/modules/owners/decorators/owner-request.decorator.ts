import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';

export const OwnerRequest = createParamDecorator<string, ExecutionContext>(
  (propertyPath: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const owner = request['user'];
    console.log(owner);
    if (!owner) throw new InternalServerErrorException('User not found in request');
    return !propertyPath ? owner : owner[propertyPath];
  },
);
