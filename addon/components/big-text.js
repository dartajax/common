import Component from '@ember/component';
import { computed } from '@ember/object';
import { typeOf } from '@ember/utils';
import { htmlSafe } from '@ember/string';
import layout from '../templates/components/big-text';

const { collect, sum } = computed;

export default Component.extend({
  layout,
  expanded: false,
  classNames: ['big-text'],
  tagName: 'span',
  length: 200,
  slippage: 25,
  expandIcon: 'info-circle',
  text: '',
  ellipsis: 'ellipsis-h',
  renderHtml: true,

  onEdit() {},

  lengths: collect('length', 'slippage'),
  totalLength: sum('lengths'),

  showIcons: computed('displayText', 'text', 'renderHtml', function(){
    if(this.get('renderHtml')){
      return this.get('displayText').toString() !== this.get('text');
    } else {
      return this.get('displayText').toString() !== this.get('cleanText');
    }
  }),
  cleanText: computed('text', function(){
    let text = this.get('text') || '';

    //accounts for SafeString as well a numbers
    if (typeOf(text) !== 'string'){
      text = text.toString();
    }

    //strip any possible HTML out of the text
    return text.replace(/(<([^>]+)>)/ig,"");
  }),
  displayText: computed('cleanText', 'totalLength', 'length', 'expanded', function(){
    let cleanText = this.get('cleanText');
    let text;
    if(this.get('expanded') || cleanText.length < this.get('totalLength')){
      if(this.get('renderHtml')){
        text = this.get('text');
      } else {
        text = cleanText;
      }
    } else {
      text = cleanText.substring(0, this.get('length'));
    }

    return new htmlSafe(text);

  })
});
