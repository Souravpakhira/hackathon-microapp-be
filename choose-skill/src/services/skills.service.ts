import { Prisma, PrismaClient, Skills, UserSkill } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { CreateSkillDto } from '@/dtos/skill.dts';

class SkillService {
  public skill = new PrismaClient().skills;
  public domain = new PrismaClient().domainMaster;
  public userSkill = new PrismaClient().userSkill;
  public prisma = new PrismaClient();

  public async findAllSkills(domainID: number, userId: number): Promise<any> {
    const skillID = await this.userSkill.findMany({
      where: {
        AND: {
          userId: userId,
          domainMasterId: domainID,
          deletedAt: null
        }
      },
      select: {
        skillId: true
      }
    });
    const ids = skillID.map((skill) => skill.skillId);

    const skills = await this.skill.findMany({
      where: {
        AND: {
          domainMasterId: domainID,
          deletedAt: null,
          id: {
            notIn: ids
          }
        }
      }
    })
    return skills;
  }
  public async createSkill(skillData: Array<CreateSkillDto>): Promise<any> {
    if (isEmpty(skillData)) throw new HttpException(400, "skillData is empty");

    // const createSkillData:Prisma.BatchPayload = await this.skill.createMany({ data: skillData });

    const createSkillData = this.prisma.$transaction(
      skillData.map((skill) => this.skill.create({ data: skill })),
    );

    return createSkillData;
  }

  public async updateSkill(skillId: number, skillData: CreateSkillDto): Promise<Skills> {
    if (isEmpty(skillData)) throw new HttpException(400, "skillData is empty");

    const findSkill: Skills = await this.skill.findUnique({ where: { id: skillId } });
    if (!findSkill) throw new HttpException(409, "Skill doesn't exist");

    const updateSkillData = await this.skill.update({ where: { id: skillId }, data: { ...skillData } });
    return updateSkillData;
  }

  public async deleteSkill(skillId: number): Promise<Skills> {
    if (isEmpty(skillId)) throw new HttpException(400, "Skill doesn't exist Id");

    const findSkill: Skills = await this.skill.findUnique({ where: { id: skillId } });
    if (!findSkill) throw new HttpException(409, "Skill doesn't exist");

    const deleteSkillData = await this.skill.update({ where: { id: skillId }, data: { ...findSkill, deletedAt: new Date() } });
    return deleteSkillData;
  }

}

export default SkillService;
