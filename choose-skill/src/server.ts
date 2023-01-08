import App from '@/app';
import IndexRoute from '@routes/index.route';
import validateEnv from '@utils/validateEnv';
import SkillsRoute from '@routes/skill.route';
import UserSkillRoute from './routes/user-skill.route';
validateEnv();
const app = new App([new IndexRoute(), new UserSkillRoute(), new SkillsRoute()]);

app.listen();
