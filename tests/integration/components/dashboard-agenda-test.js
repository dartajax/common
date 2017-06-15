import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';
import Ember from 'ember';
import wait from 'ember-test-helpers/wait';


let mockEvents;
let userEventsMock;
let blankEventsMock;

moduleForComponent('dashboard-agenda', 'Integration | Component | dashboard agenda', {
  integration: true,
  beforeEach(){
    let today = moment();
    mockEvents = [
      {name: 'first', startDate: today.format(), location: 123, lastModified: today.format()},
      {name: 'second', startDate: today.format(), location: 456, lastModified: today.format()},
      {name: 'third', startDate: today.format(), location: 789, lastModified: today.format()},
    ];
    userEventsMock = Ember.Service.extend({
      getEvents(){
        return new Ember.RSVP.resolve(mockEvents);
      }
    });
    blankEventsMock = Ember.Service.extend({
      getEvents(){
        return new Ember.RSVP.resolve([]);
      }
    });
  }
});

test('it renders with events', function(assert) {
  assert.expect(7);
  this.register('service:user-events', userEventsMock);
  this.inject.service('user-events', { as: 'userEvents' });

  this.render(hbs`{{dashboard-agenda}}`);
  const title = 'h3';

  return wait().then(()=>{
    assert.equal(this.$(title).text().trim(), 'My Activities for the next 60 days');
    for(let i = 0; i < 3; i++){
      let tds = this.$(`table tr:eq(${i}) td`);
      assert.equal(tds.eq(0).text().trim(), moment(mockEvents[i].startDate).format('dddd, MMMM Do, YYYY h:mma'));
      assert.equal(tds.eq(1).text().trim(), mockEvents[i].name);
    }
  });


});

test('it renders blank', function(assert) {
  assert.expect(2);
  this.register('service:user-events', blankEventsMock);
  this.inject.service('user-events', { as: 'userEvents' });

  this.render(hbs`{{dashboard-agenda}}`);
  const title = 'h3';
  const body = 'p';

  return wait().then(()=>{
    assert.equal(this.$(title).text().trim(), 'My Activities for the next 60 days');
    assert.equal(this.$(body).text().trim(), 'None');
  });
});