import { Module } from '@nestjs/common';
import { SlipsController } from './slips.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SlipsSchema } from 'src/schemas/slips.schema';
import { SlipsService } from './slips.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'slips', schema: SlipsSchema }]),
  ],
  controllers: [SlipsController],
  providers: [SlipsService],
})
export class SlipsModule {}
