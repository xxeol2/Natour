// app.js
const express = require('express');

const app = express();

// root URL '/'
// get : http method
app.get('/', (req, res) => {
    // res.status(200).json("Hello from the server side!!");

    // json을 response로 보내기
    res
    .status(200)
    .json({message:'Hello from the server side!', app:'Natours'});
    // status 200 은 default 값이다
});


app.post('/', (req,res) => {
    res.send('You can post to this endpoint...');
})

const port = 3000;
// http 일 때랑 거의 비슷
app.listen(port, () => { 
    console.log(`App running on port ${port}...`);
});

// routing : basically to determine how an application responds to a certain client request
