import { z } from "zod"
import {
  IsBoolean,
  IsDefined,
  IsFQDN,
  IsInt,
  IsNumberString, IsOptional,
  IsString, IsUrl
} from "class-validator";

export class UploadRequestDto {
  @IsDefined()
  @IsUrl()
  url!: string

  @IsOptional()
  @IsString()
  source?: string

  @IsOptional()
  @IsNumberString()
  ireneBotId?: number

  @IsOptional()
  @IsNumberString()
  ireneBotIdolId?: number

  @IsString()
  @IsOptional()
  ireneBotIdolName?: string

  @IsNumberString()
  @IsOptional()
  personId?: number

  @IsOptional()
  @IsBoolean()
  public?: boolean
}
