import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { OtpModule } from './otp/otp.module';
import { MailingService } from './mailing/mailing.service';
import { MailingModule } from './mailing/mailing.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 5432),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: false,
      entities: [__dirname + '/database/core/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT, 465),
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      },
    }),
    AuthModule,
    UserModule,
    OtpModule,
    MailingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
