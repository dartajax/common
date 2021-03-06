import Component from '@ember/component';
import layout from '../templates/components/collapsed-objectives';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  tagName: 'section',
  classNames: ['collapsed-objectives'],
  subject: null,

  objectives: computed('subject.objectives.[]', async function(){
    const subject = this.get('subject');
    const objectives = await subject.get('objectives');

    return objectives;
  }),
  objectivesWithParents: computed('objectives.[]', async function(){
    const objectives = await this.get('objectives');
    const objectivesWithParents = objectives.filter(objective => {
      const parentIds = objective.hasMany('parents').ids();

      return parentIds.length > 0;
    });

    return objectivesWithParents;
  }),
  objectivesWithMesh: computed('objectives.[]', async function(){
    const objectives = await this.get('objectives');
    const objectivesWithMesh = objectives.filter(objective => {
      const meshDescriptorIds = objective.hasMany('meshDescriptors').ids();

      return meshDescriptorIds.length > 0;
    });

    return objectivesWithMesh;
  }),
});
