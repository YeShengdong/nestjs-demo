import { Strategy } from 'passport-jwt';
import * as authHDR from 'passport-jwt/lib/auth_header';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { jwtConstants } from './constants';

const fromCustomHeader: () => (request: Request) => string | null = () => {
  const authScheme = 'bearer';

  return (request) => {
    const headerName = process.env.AUTH_HEADER_NAME as string;
    const headerValue = request.headers[headerName] as string | undefined;
    let token = null;

    if (headerValue) {
      const authParams = authHDR.parse(headerValue);

      if (authParams && authScheme === authParams.scheme.toLowerCase()) {
        token = authParams.value;
      }
    }

    return token;
  };
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: fromCustomHeader(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
