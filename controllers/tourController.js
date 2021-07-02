
const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// 존재하는 ID인지 check -> 없으면 404 error
exports.checkID = (req, res, next, val) => {
    console.log(`Tour id is : ${val}`);

    // return과 next 매우 중요
    // return 없으면 next로 가서 코드 쭉쭉 -> another response
    if(req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status : 'fail',
            message : 'Invalid ID'
        });
    }
    next();
}

exports.checkBody = (req,res,next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status : 'fail',
            message : 'Missing name or price'
        })
    }

    next();
}

exports.getAllTours = (req,res) => {
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

exports.getTour = (req,res) => {
    // console.log(req.params.id);

    const id = req.params.id * 1; // [convert] string -> num
    const tour = tours.find(el => el.id === id); // tours에서 el.id가 id와 같은것들만 찾음


    res.status(200).json({
        status: 'success',
        data : {
            tour
        }
    });
};

exports.createTour = (req,res) => {
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

exports.updateTour = (req,res)=> {

    res.status(200).json({
        status: 'success',
        data: {
            tour : '<Updated tour here...>'
        }
    });
};

exports.deleteTour = (req,res)=> {
    res.status(204).json({
        status: 'success',
        data:null
    });
};

// export 하나 아니라서 module.export 사용 불가 → export object에 함수들 다 넣어주기
