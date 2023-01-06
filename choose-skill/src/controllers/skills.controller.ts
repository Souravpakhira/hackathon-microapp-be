import { NextFunction, Request, Response } from 'express';
import { Skills } from '@prisma/client';
import skillService from '@/services/skills.service';
import { CreateSkillDto } from '@/dtos/skill.dts';

class SkillsController {
  public skillService = new skillService();

  public getSkillsByDomainID = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const domainID = Number(req.params.id);

      const findAllSkillsData = await this.skillService.findAllSkills(domainID);

      res.status(200).json({ data: findAllSkillsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}

export default SkillsController;
