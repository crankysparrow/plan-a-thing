var express = require( 'express' );
var router = express.Router();
var eventController = require('../controllers/eventController');
var Event = require('../models/event');

/* GET home page. */
router.get( '/', function ( req, res, next ) {
  Event.find()
    .exec(function(err, events) {
      if (err) return next(err);
      res.render( 'scheduler', { title: 'Scheduler', events: events } );    
    })
} );

router.get('/event/create', eventController.eventCreateGet);

router.post('/event/create', eventController.eventCreatePost);

router.get('/event/:id/attend', eventController.eventAttendGet);

router.post('/event/:id/attend', eventController.eventAttendPost);

router.get( '/event/:id/delete', eventController.eventDeleteGet);

router.post('/event/:id/delete', eventController.eventDeletePost);

router.get( '/event/:id', eventController.eventDetail );

module.exports = router;
