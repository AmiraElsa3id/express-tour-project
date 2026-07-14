const express = require('express');
const fs = require('fs');
const morgan = require('morgan')

const app = express();


//middlewares
app.use(morgan('dev'))
app.use(express.json());


let tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8'));

//tour route handlers
const getAllTours =(req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tours
        }
    });
}
const getTour =(req, res) => {

    const id = req.params.id;
    const tour = tours.find(tour => tour.id === parseInt(id));

    if(!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    
    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
}

const createTour = (req, res) => {
    let newTour = req.body;
    const TourID = tours[tours.length - 1].id + 1;
    newTour = { ...newTour, id: TourID };
    tours = [...tours, newTour];

    fs.writeFileSync(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours));
    console.log(newTour);

    res.status(201).json({
        status: 'success',
        data: {
            tour: newTour
        }
    });
}
const updateTour =(req, res) => {

    const id = req.params.id;
    const tour = tours.find(tour => tour.id === parseInt(id));
    
    if(!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
   
    res.status(200).json({
        status: 'success',
        data: {
            tour: 'Updated tour'
        }
    });
}

const deleteTour=(req, res) => {
    const id = req.params.id;
    const tour = tours.find(tour => tour.id === parseInt(id));
    
    if(!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
   
    res.status(204).json({
        status: 'success',
        data: null
    });
}

//user route handlers
const getAllUsers =(req, res) => {
    res.status(500).json({
        status:'error',
        message:'this endpoint is not implemented yet'
    });
}
const getUser =(req, res) => {
    res.status(500).json({
        status:'error',
        message:'this endpoint is not implemented yet'
    });
}
const createUser =(req, res) => {
    res.status(500).json({
        status:'error',
        message:'this endpoint is not implemented yet'
    });
}
const updateUser =(req, res) => {
    res.status(500).json({
        status:'error',
        message:'this endpoint is not implemented yet'
    });
}
const deleteUsers =(req, res) => {
    res.status(500).json({
        status:'error',
        message:'this endpoint is not implemented yet'
    });
}

//routes
const tourRouter = express.Router();
const userRouter = express.Router();

//tour routes
tourRouter.route('/')
.get(getAllTours)
.post(createTour);

tourRouter.route('/:id')
.get( getTour)
.patch( updateTour )
.delete(deleteTour );
//user routes
userRouter.route('/')
.get(getAllUsers)
.post(createUser);

userRouter.route('/:id')
.get( getUser)
.patch( updateUser )
.delete(deleteUser );


//route middleware
app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);


//start server 
app.listen(3000, () => {
    console.log('Server running on port 3000 , Link: http://localhost:3000');
});