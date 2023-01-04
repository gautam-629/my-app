import express from 'express'
let app=express();
import cors from 'cors';
import {APP_PORT,DB_URL} from './config';
import {auth} from './routes';
import errorHandler from './middlewares/errorHandler';
app.use(express.urlencoded({extended:false}));
import connectDb from './config/database';
import cookieParser from 'cookie-parser';
app.use(cors({origin:['http://localhost:3000']}))
connectDb(DB_URL);
app.use('/storage',express.static('storage'))
app.use(cookieParser())
app.use(express.json({limit:'8mb'}))
//config routers
app.use('/api',auth);
app.use(errorHandler);
app.listen(APP_PORT,()=>{
    console.log(`ServerRunning at port http://localhost:${APP_PORT}`);
})