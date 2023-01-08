import { NextFunction, Request, Response } from 'express';
import { Skills } from '@prisma/client';
import skillService from '@/services/skills.service';
import { CreateSkillDto } from '@/dtos/skill.dts';
import { RequestWithUser } from '@/interfaces/auth.interface';
class SkillsController {
  public skillService = new skillService();

  public getSkillsByDomainID = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const domainID = Number(req.params.id);
      const userId = Number(req.user.id);
      const findAllSkillsData = await this.skillService.findAllSkills(domainID, userId);

      res.status(200).json({ data: findAllSkillsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}

export default SkillsController;
