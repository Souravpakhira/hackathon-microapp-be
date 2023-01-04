import { Router } from 'express';
import UserSkillsController from '@/controllers/user-skill.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateUserSkillDto, BulkCreateUserSkillDto } from '@/dtos/user-skill.dts';
import authMiddleware from '@/middlewares/auth.middleware';

class UserSkillRoute implements Routes {
    public path = '/user-skill';
    public router = Router();
    public userskillsController = new UserSkillsController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, authMiddleware, this.userskillsController.getUserSkills);
        this.router.post(`${this.path}`, authMiddleware, validationMiddleware(BulkCreateUserSkillDto, 'body'), this.userskillsController.createUserSkill);
        this.router.put(`${this.path}/:id(\\d+)`, authMiddleware, validationMiddleware(CreateUserSkillDto, 'body'), this.userskillsController.updateUserSkill);
        this.router.delete(`${this.path}/:id(\\d+)`, authMiddleware, this.userskillsController.deleteSkill);
    }
}

export default UserSkillRoute;
