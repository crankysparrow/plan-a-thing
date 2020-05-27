var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');
var slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

var EventSchema = new Schema(
  {
    title: {type: String, required: true},
    start_date: {type: Date},
    end_date: {type: Date},
    // slug: {type: String, slug: ['title'], slug_padding_size: 2, unique: true},
    availability: [Schema.Types.Mixed],
    respondents: [{type: String}],
    start_time: {type: Number},
    end_time: {type: Number}
  }
);

EventSchema
  .virtual('url')
  .get(function() {
    return '/scheduler/event/' + this._id;
  });

EventSchema
  .virtual('start_date_f')
  .get(function() {
    return moment(this.start_date).format('MM/DD/YYYY');
  })

EventSchema
  .virtual('end_date_f')
  .get(function() {
    return moment(this.end_date).format('MM/DD/YYYY');
  })

EventSchema
  .virtual('number_of_days')
  .get(function() {
    var a = moment(this.start_date);
    var b = moment(this.end_date);
    return b.diff(a, 'days') + 1;
  })

EventSchema
  .virtual('days')
  .get(function() {
    let days = [];
    let start = moment(this.start_date);
    for (let i = 0; i < this.number_of_days; i++) {
      days.push(start.clone().add(i, 'days').format('MM/DD/YYYY'))
    }
    return days;
  })

module.exports = mongoose.model('Event', EventSchema);