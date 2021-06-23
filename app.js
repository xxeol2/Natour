// app.js
const fs = require('fs');
const express = require('express');

const app = express();


// express.json()이 middleware이다
// request와 response 사이에 stand 해서 middleware
app.use(express.json());


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


app.get('/api/v1/tours/:id', (req,res) => {
    console.log(req.params.id);

    const id = req.params.id * 1; // [convert] string -> num

    // if(id > tours.length) {
    //     return res.status(404).json({
    //         status : 'fail',
    //         message : 'Invalid ID'
    //     });
    // }

    const tour = tours.find(el => el.id === id); // tours에서 el.id가 id와 같은것들만 찾음

    if(!tour) {
        return res.status(404).json({
            status : 'fail',
            message : 'Invalid ID'
        });
    }

    res.status(200).json({
        status: 'success',
        data : {
            tour
        }
    });
});




// URL은 GET과 같다
// http method 만 get 에서 post 로 변경
app.post('/api/v1/tours', (req,res) => {
    // console.log(req.body);

    const newId = tours[tours.length - 1].id + 1;
    // 지금 tours는 tour object 들의 array임
    // tours.length-1 로 마지막 tour object의 정보를 불러오고
    // .id 로 해당 tour의 id 속성값을 가져옴
    // + 1 을 해줌으로써 newId 생성

    const newTour = Object.assign({id: newId}, req.body);

    tours.push(newTour); //tours array에 newTour을 넣어준다
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });
        // 200 -> OK
        // 201 -> created
    });
    // res.send('Done');
});

app.patch('/api/v1/tours/:id', (req,res)=> {

    // 존재하는 ID인지 확인 -> 없으면 404 error
    if(req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status : 'fail',
            message : 'Invalid ID'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour : '<Updated tour here...>'
        }
    });
});

app.delete('/api/v1/tours/:id', (req,res)=> {
    // 존재하는 ID인지 확인 -> 없으면 404 error
    if(req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status : 'fail',
            message : 'Invalid ID'
        });
    }

    // 204 -> no Content
    res.status(204).json({
        status: 'success',
        data: null // 삭제해서 no longer exist
    });
});


const port = 3000;
// http 일 때랑 거의 비슷
app.listen(port, () => { 
    console.log(`App running on port ${port}...`);
});

// routing : basically to determine how an application responds to a certain client request
