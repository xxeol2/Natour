// app.js

const express = require('express');
const morgan = require('morgan');


const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')


const app = express();

// =================================================================
// 1) MIDDLEWARES

// logging method -> 요청 기록 남기는 middleware
app.use(morgan('dev'));

// express.json()이 middleware이다
// request와 response 사이에 stand 해서 middleware
app.use(express.json());


// middleware function의 3rd argument로 next Function
app.use((req, res, next) => {
    console.log('Hello from the middleware 🤗');
    
    // 모든 middle ware에 next 써주는거 잊으면 안됨
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();

    next();
});

// =================================================================
// 3) ROUTES

// Mounting Router 라 부른다
app.use('/api/v1/tours', tourRouter); // parentRoot : /api/v1/tours
app.use('/api/v1/users', userRouter); // parentRoot : /api/v1/users

module.exports=app;

// routing : basically to determine how an application responds to a certain client request
