var Event = require('../models/event');
const moment = require('moment');
const { check, validationResult } = require('express-validator');

let timeFormattedArr = [
  '12:00am', '12:30am', '1:00am', '1:30am', '2:00am', '2:30am', '3:00am', '3:30am', '4:00am', '4:30am', '5:00am', '5:30am', '6:00am', '6:30am', '7:00am', '7:30am', '8:00am', '8:30am', '9:00am', '9:30am', '10:00am', '10:30am', '11:00am', '11:30am',
  '12:00pm', '12:30pm', '1:00pm', '1:30pm', '2:00pm', '2:30pm', '3:00pm', '3:30pm', '4:00pm', '4:30pm', '5:00pm', '5:30pm', '6:00pm', '6:30pm', '7:00pm', '7:30pm', '8:00pm', '8:30pm', '9:00pm', '9:30pm', '10:00pm', '10:30pm', '11:00pm', '11:30pm',];

exports.eventDetail = function(req, res, next) {
  Event.findById(req.params.id, function(err, event) {
    if (err) return next(err);
    res.render('event_detail', {
      title: 'Event Detail', 
      event: event,
      timeFormattedArr: timeFormattedArr
    });
  })
}

exports.eventCreateGet = function(req, res, next) {
  res.render('event_create', {
      title: 'Create Event', 
      timeFormattedArr: timeFormattedArr
    })
}

exports.eventCreatePost = function(req, res, next) {
  var event = new Event({
    title: req.body.event_title,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    start_time: +req.body.start_time,
    end_time: +req.body.end_time
  })

  console.log(req.body);

  let hours = [];

  let start = +req.body.start_time;
  let end = +req.body.end_time;

  for ( let i = 0; i < 48; i++ ) {
    if ( i < start || i > end ) {
      hours.push( null );
    }
    else {
      hours.push( [] );
    }
  }

  let a = moment( req.body.start_date );
  let b = moment( req.body.end_date );
  let days = b.diff( a, 'days' ) + 1;

  let i = 0;
  let avail = [];
  while ( i < days ) {
    avail[i] = hours;
    i++;
  }  

  
  event.availability = avail;
  
  event.save(function(err) {
    if (err) return next(err);
    res.redirect(event.url);
  })
}

exports.eventAttendGet = function(req, res, next) {
  Event.findById(req.params.id, function(err, event) {
    if (err) return next(err);
    res.render('event_attend', {
      title: 'Attend Event',
      event: event,
      timeFormattedArr: timeFormattedArr
    })
  })
}

exports.eventAttendPost = [
  check('name').not().isEmpty().withMessage('You must enter a name.'),
  (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors});
    }
    Event.findById( req.params.id, function ( err, event ) {
      if ( err ) return next( err );

      console.log( event );
      let name = req.body.name;
      let newAvail = event.availability;
      let dates = req.body.dates;
      console.log( dates )

      dates.forEach( date => {
        date = date.split( '-' );
        newAvail[date[0]][date[1]].push( name );
      } )

      event.availability = newAvail;
      event.respondents.push( name );

      event.markModified( 'availability', 'respondents' );
      event.save();

      res.redirect( event.url );
    })
  }
]

exports.eventDeleteGet = function ( req, res, next ) {
  Event.findById(req.params.id, function(err, event) {
    if (err) return next(err);

    res.render('event_delete', { event: event, title: 'Delete Event' })
  })
}

exports.eventDeletePost = function(req, res, next) {
  Event.findByIdAndRemove(req.params.id, function (err) {
    if (err) return next(err);
    res.redirect('/scheduler')
  })
}