import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TasksModule,
    TypeOrmModule.forRoot({
      type : "postgres",
      url : "postgres://drcxiiwkqgeihh:05b1a6e55a4cdf8c78e7462d3947d34349dead3768dc101088072edd4ff4b88c@ec2-52-22-136-117.compute-1.amazonaws.com:5432/ddroqk4pc770h3",
      database : "05b1a6e55a4cdf8c78e7462d3947d34349dead3768dc101088072edd4ff4b88c",
      // host : "ec2-52-22-136-117.compute-1.amazonaws.com",
      // username : "drcxiiwkqgeihh",
      // password : "05b1a6e55a4cdf8c78e7462d3947d34349dead3768dc101088072edd4ff4b88c",
      // port : 5432,
      // extra: {
      //   ssl: true
      // }
      autoLoadEntities: true,
      synchronize : true,
      ssl: { rejectUnauthorized: false }      
    }),
    AuthModule
  ],
})
export class AppModule {}
