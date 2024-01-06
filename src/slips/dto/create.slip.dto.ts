import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsMongoId,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateSlipDto {
  @ApiProperty({ type: String, isArray: true })
  @IsArray()
  @IsMongoId({ each: true })
  orders: Types.ObjectId[];

  @ApiProperty({ type: String })
  @IsUrl()
  image: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  additional_info: string;

  @ApiProperty({ type: Date })
  @IsDateString()
  transfer_date: Date;
}
