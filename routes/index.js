
const userRouter = require('./userRoute')
const videoRouter = require('./videoRoute');

const initRoutes = (app) => {
 

    app.use('/api/user',userRouter)
    app.use('/api/video',videoRouter)
  
};

module.exports = initRoutes;
