import { Router } from 'express';
import SkillsController from '@/controllers/skills.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { BulkCreateSkillDto, CreateSkillDto } from '@/dtos/skill.dts';
import authMiddleware from '@/middlewares/auth.middleware';

class SkillRoute implements Routes {
    public path = '/skill';
    public router = Router();
    public skillsController = new SkillsController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:id(\\d+)`, authMiddleware, this.skillsController.getSkillsByDomainID);
    }
}

export default SkillRoute;
