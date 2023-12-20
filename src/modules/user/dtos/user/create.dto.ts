import { i18nValidationMessage } from "nestjs-i18n";
import { ArrayNotEmpty, IsArray, IsEmail, IsNotEmpty, IsNumber, IsString, Max, MaxLength } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({ message: i18nValidationMessage('validation.IS_NOT_EMPTY') })
    username: string;

    @IsNotEmpty({ message: i18nValidationMessage('validation.IS_NOT_EMPTY') })
    @MaxLength(10, { message: i18nValidationMessage('validation.IS_MAX_LENGTH', { value: 10 }) })
    password: string;

    @IsArray({ message: i18nValidationMessage('validation.IS_ARRAY') })
    @ArrayNotEmpty({ message: i18nValidationMessage('validation.ARRAY_NOT_EMPTY') })
    roleIds: number[];

    @IsNotEmpty({ message: i18nValidationMessage('validation.IS_NOT_EMPTY') })
    @IsString({ message: i18nValidationMessage('validation.IS_STRING') })
    @IsEmail({}, { message: i18nValidationMessage('validation.INVALID_EMAIL') })
    email?: string;
}