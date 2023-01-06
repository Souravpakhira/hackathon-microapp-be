import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import DomainsRoute from './routes/domain.route';
import SkillsRoute from '@routes/skill.route';
import UserSkillRoute from './routes/user-skill.route';
validateEnv();
const app = new App([new IndexRoute(), new UserSkillRoute()]);

app.listen();
