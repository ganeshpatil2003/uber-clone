import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { captainRoutes } from './routes/captainRoutes.routes.js';
import { userRoutes } from './routes/userRoutes.routes.js';

const app = express();

app.use(cors({
    credentials : true,
    origin : process.env.ORIGIN_CORS,
}));

app.use(express.json({
    limit : '16kb',
}));

app.use(express.urlencoded({
    limit : '16kb',
    extended : true,
}));

app.use(express.static("public"));

app.use(cookieParser());

app.use('/api1/v1/captains', captainRoutes);

app.use('api1/v1/users', userRoutes);

export {app};