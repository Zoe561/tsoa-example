import express, { json, urlencoded } from 'express';
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from '../build/routes';

export const app = express();

// 使用 JSON middleware
app.use(json());
app.use(urlencoded({ extended: true }));

// 註冊 tsoa 路由
RegisterRoutes(app);

// 設定 Swagger
app.use('/docs', swaggerUi.serve, async (_req: express.Request, res: express.Response) => {
    return res.send(swaggerUi.generateHTML(await import('../build/swagger.json')));
});
