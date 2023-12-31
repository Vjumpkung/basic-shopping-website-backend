import { Module } from '@nestjs/common';
import { SlipsController } from './slips.controller';
import { SlipsService } from './slips.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SlipsSchema } from 'src/schemas/slips.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Slips', schema: SlipsSchema }]),
  ],
  controllers: [SlipsController],
  providers: [SlipsService],
})
export class SlipsModule {}
