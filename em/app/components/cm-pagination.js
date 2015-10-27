import Ember from 'ember';

function buildPages(current, total) {
  const maxWindowSize = 5;
  const maxOffset = (maxWindowSize - 1) / 2; // the maximum distance to the current page we will show

  let pages = [];

  if (current > 1 + maxOffset) {
    pages.push({
      number: 1,
      label: 1
    });
  }
  if (current > 2 + maxOffset) {
    pages.push({
      number: current - maxOffset - 1,
      label: '…'
    });
  }
  for (let i = Math.max(current - maxOffset, 1); i <= Math.min(current + maxOffset, total); i++) {
    pages.push({
      number: i,
      label: i,
      current: i === current
    });
  }
  if (current < total - maxOffset - 1) {
    pages.push({
      number: current + maxOffset + 1,
      label: '…'
    });
  }
  if (current < total - maxOffset) {
    pages.push({
      number: total,
      label: total
    });
  }
  return pages;
}

export default Ember.Component.extend({
  pages: Ember.computed('info', function() {
    return buildPages(this.get('info.current_page'), this.get('info.total_pages'));
  }),
  multiplePages: Ember.computed('pages', function() {
    return this.get('pages').length > 1;
  }),

  actions: {
    goTo (number) {
      this.get('goTo')(number);
    }
  }
});
