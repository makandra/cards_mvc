import Vue from 'vue'

Vue.component('tab', {
  data() {
    return {
      active: false
    };
  },
  props: ['title'],
  template: `
            <div class='tab-pane' :class='{ active: active }'>
              <slot></slot>
            </div>
            `,

  created() {
    this.$dispatch('tabsChanged');
  },
  destroyed() {
    this.$dispatch('tabsChanged');
  },
});

Vue.component('tabs', {
  data() {
    return {
      tabs: [],
    };
  },
  template: `
            <ul class="nav nav-tabs">
              <li v-for="tab in tabs" :class="{active: tab.active}">
                <a href @click.prevent="activate(tab)">{{ tab.title }}</a>
              </li>
            </ul>
            <div class='tab-content'>
              <slot></slot>
            </div>
            `,

  compiled() {
    setTimeout(() => {
      this.startTracking = true;
      this.tabsChanged();
    }, 0);
  },

  events: {
    'tabsChanged': 'tabsChanged',
  },

  methods: {
    tabsChanged() {
      // avoid n calls on first render
      if ( this.startTracking ) {
        this.tabs = [];
        let anyActive = false;
        for (let child of this.$children) {
          if ( child.$options.name == 'tab') {
            anyActive = anyActive || child.active;
            this.tabs.push(child);
          }
        }
        if (!anyActive && this.tabs.length > 0) {
          this.tabs[0].active = true;
        }
      }
    },
    activate(tab) {
      tab.active = true;
      for (let otherTab of this.tabs) {
        if ( otherTab !== tab ) {
          otherTab.active = false;
        }
      }
    }
  }
});
