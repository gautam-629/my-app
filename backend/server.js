import express from 'express'
let app=express();
import {APP_PORT,DB_URL} from './config';
import {auth} from './routes';
import errorHandler from './middlewares/errorHandler';
app.use(express.urlencoded({extended:false}));
import connectDb from './config/database';
import cookieParser from 'cookie-parser';

connectDb(DB_URL);
app.use(cookieParser())
app.use(express.json())
//config routers
app.use('/api',auth);
app.use(errorHandler);
app.listen(APP_PORT,()=>{
    console.log(`ServerRunning at port http://localhost:${APP_PORT}`);
})