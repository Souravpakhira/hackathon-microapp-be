import { Type } from 'class-transformer';
import { IsString, IsNumber, IsArray, ValidateNested } from 'class-validator';

export class CreateUserSkillDto {
    @IsString()
    public skillLevel: string;

    @IsNumber()
    public YOE: number;

    @IsNumber()
    public userId: number;

    @IsNumber()
    public domainMasterId: number;

    @IsNumber()
    public skillId: number;
}

export class BulkCreateUserSkillDto {
    @IsArray()
    public data: CreateUserSkillDto[]
}