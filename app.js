// app.js
const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

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

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);


// =================================================================
// 2) ROUTE HANDLERS

const getAllTours = (req,res) => {
    console.log(req.requestTime);

    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length, // multiple object들을 array로 보낼 때만 사용
        data: {
            tours //원래 tours:tours 인데 이름 같아서 생략
        }
    });
};

const getTour = (req,res) => {
    console.log(req.params.id);

    const id = req.params.id * 1; // [convert] string -> num
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
};

const createTour = (req,res) => {
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
};

const updateTour = (req,res)=> {
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
};

const deleteTour = (req,res)=> {
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
};

const getAllUsers = (req, res) => {
    res.status(500).json({
        json: 'error',
        message: 'This route is not yet defined'
    });

};

const getUser = (req, res) => {
    res.status(500).json({
        json: 'error',
        message: 'This route is not yet defined'
    });

};

const createUser = (req, res) => {
    res.status(500).json({
        json: 'error',
        message: 'This route is not yet defined'
    });

};

const updateUser = (req, res) => {
    res.status(500).json({
        json: 'error',
        message: 'This route is not yet defined'
    });
};

const deleteUser = (req, res) => {
    res.status(500).json({
        json: 'error',
        message: 'This route is not yet defined'
    });

};





// ===============================
// 3) ROUTES


// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id',deleteTour);

// 이 모든게 middleware function
app
    .route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour);

app
    .route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);


app
    .route('/api/v1/users')
    .get(getAllUsers)
    .post(createUser);

app
    .route('/api/v1/users/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);



// =================================================================
// 4) START SERVER


const port = 3000;
// http 일 때랑 거의 비슷
app.listen(port, () => { 
    console.log(`App running on port ${port}...`);
});

// routing : basically to determine how an application responds to a certain client request
