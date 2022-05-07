import { IsBoolean, IsEmail, IsOptional } from 'class-validator'

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  @IsEmail()
  password?: string

  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean
}
