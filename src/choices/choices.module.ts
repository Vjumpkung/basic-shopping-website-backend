import { Module } from '@nestjs/common';
import { ChoicesController } from './choices.controller';
import { ChoicesService } from './choices.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ChoicesSchema } from 'src/schemas/choices.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'choices', schema: ChoicesSchema }]),
  ],
  controllers: [ChoicesController],
  providers: [ChoicesService],
})
export class ChoicesModule {}
