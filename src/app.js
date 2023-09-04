import config from './config';
import express from 'express';
import cors from 'cors';

import userRoutes from './routes/users.routes';
import academicRoutes from './routes/academic.routes';
import requestRoutes from './routes/request.routes';

const app = express();

//settings
app.set('port', config.port);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(userRoutes);
app.use(academicRoutes);
app.use(requestRoutes);

export default app;
