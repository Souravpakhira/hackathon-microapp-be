import { PrismaClient, UserSkill } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { CreateUserSkillDto } from '@/dtos/user-skill.dts';

class UserSkillService {
    public userskill = new PrismaClient().userSkill;
    public prisma = new PrismaClient();

    public async findAllSkillOfUser(userId: number): Promise<UserSkill[]> {
        const allskill = await this.userskill.findMany({
            where: {
                AND: {
                    deletedAt: null,
                    userId: userId
                }
            },
            include: {
                User: {
                    select: { name: true }
                },
                Skill: {
                    select: { name: true }
                },
                DomainMaster: {
                    select: { name: true }
                }
            },
            orderBy: {
                updatedAt: "desc"
            }
        });
        return allskill;
    }

    // public async findDomainById(domainId: number): Promise<DomainMaster> {
    //     if (isEmpty(domainId)) throw new HttpException(400, "Domain Id is empty");

    //     const findDomain: DomainMaster = await this.domain.findUnique({ where: { id: domainId } });
    //     if (!findDomain) throw new HttpException(409, "User doesn't exist");

    //     return findDomain;
    // }

    public async createUserSkill(userData: Array<CreateUserSkillDto>): Promise<any> {
        if (isEmpty(userData)) throw new HttpException(400, "User Data is empty");

        const createUserSkillData = this.prisma.$transaction(
            userData.map((skill) => this.userskill.create({ data: skill })),
        );
        return createUserSkillData;
    }

    public async updateUserSkill(id: number, skillData: CreateUserSkillDto): Promise<UserSkill> {
        if (isEmpty(skillData)) throw new HttpException(400, "skillData is empty");

        const findSkill: UserSkill = await this.userskill.findUnique({ where: { id: id } });
        if (!findSkill) throw new HttpException(409, "Skill doesn't exist");

        const updateUserSkillData = await this.userskill.update({ where: { id: id }, data: { ...skillData } });
        return updateUserSkillData;
    }

    public async deleteUserSkill(id: number): Promise<UserSkill> {
        if (isEmpty(id)) throw new HttpException(400, "Skill doesn't exist Id");

        const findSkill: UserSkill = await this.userskill.findUnique({ where: { id: id } });
        if (!findSkill) throw new HttpException(409, "Skill doesn't exist");

        const deleteSkillData = await this.userskill.update({ where: { id: id }, data: { ...findSkill, deletedAt: new Date() } });
        return deleteSkillData;
    }
}

export default UserSkillService;
