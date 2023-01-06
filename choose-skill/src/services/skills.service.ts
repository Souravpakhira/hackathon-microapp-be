import { Prisma, PrismaClient, Skills } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { CreateSkillDto } from '@/dtos/skill.dts';

class SkillService {
  public skill = new PrismaClient().skills;
  public domain = new PrismaClient().domainMaster;
  public prisma = new PrismaClient();

  public async findAllSkills(domainID: number): Promise<any> {
    const allskill = await this.prisma.$queryRaw`select s.id , s.name from "Skills" s 
    left join "UserSkill" us on us."skillId" = s.id 
    where s."domainMasterId" = ${domainID} and us.id is Null and s."deletedAt" is Null`

    return allskill;
  }
}

export default SkillService;
