import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { pluralize } from 'ember-inflector';

module('Unit | Model | vocabulary', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let model = this.owner.lookup('service:store').createRecord('vocabulary');
    assert.ok(!!model);
  });

  test('pluralization', function(assert){
    assert.equal(pluralize('vocabulary'), 'vocabularies');
  });

  test('getTopLevelTerms', async function(assert) {
    assert.expect(3);
    const model = this.owner.lookup('service:store').createRecord('vocabulary');
    const store = model.store;
    const term1 = store.createRecord('term', { id: 1 });
    const term2 = store.createRecord('term', { id: 2 });
    const term3 = store.createRecord('term', { id: 3, parent: term2 });
    model.get('terms').pushObjects([ term1, term2, term3 ]);
    const topLevelTerms = await model.get('topLevelTerms');
    assert.equal(2, topLevelTerms.length);
    assert.ok(topLevelTerms.includes(term1));
    assert.ok(topLevelTerms.includes(term2));
  });
});
