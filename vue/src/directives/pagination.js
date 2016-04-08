import Vue from 'vue'

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


Vue.component('pagination', {
  props: ['info', 'goTo'],

  template: `
              <ul class="pagination" v-if='pages.length > 1'>
                <li v-for='page in pages' :class='{ active: page.current }'>
                  <a href @click.prevent='goToPage(page.number)'> {{ page.label }} </a>
                </li>
              </ul>
            `,

  computed: {
    pages() {
      if ( this.info ) {
        return buildPages(this.info.current_page, this.info.total_pages);
      } else {
        return [];
      }
    }
  },

  methods: {
    goToPage(number) {
      if (this.goTo) {
        this.goTo(number);
      }
    }
  }
});
