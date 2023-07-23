import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class Attachment {
  @IsEnum(['image', 'video'])
  type: 'image' | 'video';
  @IsString()
  url: string;
}

export class CreateThread {
  @IsString()
  content: string;
  @IsArray()
  @IsOptional()
  @Type(() => Attachment)
  attachments: Attachment[];
}
