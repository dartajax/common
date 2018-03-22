import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { initialize } from '../../../initializers/replace-promise';

import { run } from '@ember/runloop';

initialize();

module('Unit | Model | CurriculumInventoryExport', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let model = run(() => this.owner.lookup('service:store').createRecord('curriculum-inventory-export'));
    // let store = this.store();
    assert.ok(!!model);
  });
});
