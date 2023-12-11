import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig = (config: ConfigService): JwtModuleOptions => ({
  global: true,
  secret: config.get('JWT_SECRET'),
  signOptions: { expiresIn: '3600s' },
});


// https://app.slack.com/client/T0699A9K2HH/C068UT83Y7R?redir=%2Fapps
// https://api.slack.com/apps/A0699APGN4T/incoming-webhooks?success=1

// https://hooks.slack.com/services/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