import express from 'express'
let app=express();
import {APP_PORT} from './config';
import {auth} from './routes';
import errorHandler from './middlewares/errorHandler';
app.use(express.urlencoded({extended:false}));
app.use(express.json())
//config routers
app.use('/api',auth);
app.use(errorHandler);
app.listen(APP_PORT,()=>{
    console.log(`ServerRunning at port https://localhost:${APP_PORT}`);
})