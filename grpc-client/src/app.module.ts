import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.dev', '.env'],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'USER_PACKAGE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            package: 'user',
            protoPath: join(__dirname, 'proto/user.proto'),
            url: configService.get('URL_GRPC_SERVER'),
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
