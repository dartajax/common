import {
  clickable,
  collection,
  text
} from 'ember-cli-page-object';
import meshManager from './mesh-manager';

export default {
  scope: '[data-test-detail-mesh]',
  manage: clickable('.actions button'),
  save: clickable('.actions button.bigadd'),
  cancel: clickable('.actions button.bigcancel'),
  current: collection('.selected-mesh-terms li', {
    title: text('.term-title'),
  }),
  meshManager,
};
