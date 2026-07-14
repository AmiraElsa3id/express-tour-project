const fs = require('fs');


let tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8'));

//tour route handlers
module.exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tours
        }
    });
}
module.exports.getTour = (req, res) => {

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

module.exports.createTour = (req, res) => {
    let newTour = req.body;
    const TourID = tours[tours.length - 1].id + 1;
    newTour = { ...newTour, id: TourID };
    tours = [...tours, newTour];

    fs.writeFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours));
    console.log(newTour);

    res.status(201).json({
        status: 'success',
        data: {
            tour: newTour
        }
    });
}
module.exports.updateTour = (req, res) => {

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

module.exports.deleteTour = (req, res) => {
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