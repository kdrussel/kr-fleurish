// Dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Set public folder
app.use(express.static(path.join(__dirname, 'views')));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Enable CORS
app.use(cors());

// Localhost
const port = 3000;

// Start server
app.listen(port, () => console.log(`Magic is happening on port ${port}!`));

// Connect to MongoDB
mongoose.connect('mongodb://kerry:neworleansfleurish@ds225010.mlab.com:25010/fleurish-events')
.then(() => console.log('MongoDB connected!'))
.catch(err => console.log(err));

const Schema = mongoose.Schema;

// New MongoDB schema for all events
const EventSchema = new Schema ({
	title: String,
	website: String,
	location: String,
	description: String
}, {collection: 'events'});

const Events = mongoose.model('events', EventSchema);

// Grab the event collection from MongoDB
app.get('/all-event', function(request, response) {  
 	Events.find({},function(err,Events){
		if(err){
			console.log(err)
		}else{
			response.json(Events);
		}
	});
});

// New event created + pushed into existing Events array in MongoDB
app.post('/create-event', function(request,response){
	var createEvent = new Events(request.body);
	createEvent.save(function(){
		response.json(createEvent);
	})
});