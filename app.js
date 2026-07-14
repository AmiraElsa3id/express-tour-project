const express = require('express');
const fs = require('fs');



const app = express();
app.use(express.json());


let tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8'));


app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tours
        }
    });
});

app.get('/api/v1/tours/:id', (req, res) => {

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
});


app.post('/api/v1/tours', (req, res) => {
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
});


app.patch('/api/v1/tours/:id', (req, res) => {

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
});


app.delete('/api/v1/tours/:id', (req, res) => {
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
});

app.listen(3000, () => {
    console.log('Server running on port 3000 , Link: http://localhost:3000');
});