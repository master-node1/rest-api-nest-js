import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieMOdule } from './movies/movie.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SearchModule } from './search/search.module';
import { TracingModule } from './tracer/trace.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL),
    MovieMOdule,
    UsersModule,
    AuthModule,
    SearchModule,
    TracingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
