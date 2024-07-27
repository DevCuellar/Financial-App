import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class VerifyEmailDto {
    @IsEmail()
    @ApiProperty({ example: "test@mail.com" })
    token: string;
}
