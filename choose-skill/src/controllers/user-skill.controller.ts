import { NextFunction, Request, Response } from 'express';
import { UserSkill } from '@prisma/client';
import UserSkillService from '@/services/user-skill.service';
import { CreateUserSkillDto } from '@/dtos/user-skill.dts';
import { RequestWithUser } from '@/interfaces/auth.interface';

class UserSkillsController {
    public userskillService = new UserSkillService();

    public getUserSkills = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            const findAllSkillsData: UserSkill[] = await this.userskillService.findAllSkillOfUser(req.user.id);

            res.status(200).json({ data: findAllSkillsData, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    };


    public createUserSkill = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const skillData: CreateUserSkillDto[] = req.body.data;
            const createSkillData: UserSkill = await this.userskillService.createUserSkill(skillData);

            res.status(201).json({ data: createSkillData, message: 'created' });
        } catch (error) {
            next(error);
        }
    };

    public updateUserSkill = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const skillId = Number(req.params.id);
            const skillData: CreateUserSkillDto = req.body;
            const updateSkillData: UserSkill = await this.userskillService.updateUserSkill(skillId, skillData);

            res.status(200).json({ data: updateSkillData, message: 'updated' });
        } catch (error) {
            next(error);
        }
    };

    public deleteSkill = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const skillId = Number(req.params.id);
            const deleteSkillData: UserSkill = await this.userskillService.deleteUserSkill(skillId);

            res.status(200).json({ data: deleteSkillData, message: 'deleted' });
        } catch (error) {
            next(error);
        }
    };
}

export default UserSkillsController;
