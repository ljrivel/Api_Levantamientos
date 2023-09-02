import config from './config';
import express from 'express';
import cors from 'cors';

import userRoutes from './routes/users.routes';

const app = express();

//settings
app.set('port', config.port);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(userRoutes);

export default app;
