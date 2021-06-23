// tourRoutes.js
const express = require('express');
const tourController = require('./../controllers/tourController')
// const {getAllTours, createTour, getTour, updateTour, deleteTour} = require('./../controllers/tourController')
// tourRouter가 real middleware이다 -> app 대신 tourRouter 사용
const router = express.Router();


router
    .route('/') // api/v1/tours 를 뜻한다
    .get(tourController.getAllTours)
    .post(tourController.createTour);

router
    .route('/:id') // api/v1/tours/:id 를 뜻한다
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

module.exports = router;