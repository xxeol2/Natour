// app.js
const fs = require('fs');
const express = require('express');

const app = express();

// // root URL '/'
// // get : http method
// app.get('/', (req, res) => {
//     // res.status(200).json("Hello from the server side!!");

//     // json을 response로 보내기
//     res
//     .status(200)
//     .json({message:'Hello from the server side!', app:'Natours'});
//     // status 200 은 default 값이다
// });


// app.post('/', (req,res) => {
//     res.send('You can post to this endpoint...');
// })




const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);


// v1 으로 version 나누기
// 다른 버전 api 만들고싶으면 v2 로 만들고 v1 안건드려두됨
app.get('/api/v1/tours', (req,res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length, // multiple object들을 array로 보낼 때만 사용
        data: {
            tours //원래 tours:tours 인데 이름 같아서 생략
        }
    });
});


const port = 3000;
// http 일 때랑 거의 비슷
app.listen(port, () => { 
    console.log(`App running on port ${port}...`);
});

// routing : basically to determine how an application responds to a certain client request
