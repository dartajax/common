import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  name: attr('string'),
  value: attr('string'),
  school: belongsTo('school', {async: true}),
});
