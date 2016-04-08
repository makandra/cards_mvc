import Vue from 'vue'
import CardService from '../services/card_service.js'
import router from '../router.js'


export default Vue.extend({
  template: '#vue/cards/index',

  data() {
    return {
      page: null,
      loading: null,
      query: null,
      queryInput: null,
      cards: [],
    }
  },

  created() {
    this.searchQuerySource = new Rx.Subject();

    this.searchQuerySource
      .debounce(400)
      .subscribe(queryValue => {
        router.go({ query: { page: 1, query: queryValue } });
      });
  },

  route: {
    data() {
      let { page, query } = this.$route.query;
      return {
        query,
        page,
        queryInput: query,
      };
    },
  },

  watch: {
    'query': 'updateCards',
    'page': 'updateCards',
  },

  methods: {
    updateCards() {
      this.loading = true;
      CardService.search({ page: this.page, query: this.query }).then(cards => {
        this.cards = cards;
        this.loading = false;
      });

    },

    queryChanged() {
      this.searchQuerySource.onNext(this.queryInput);
    },

    goToPage(page) {
      router.go({ query: { page, query: this.query } });
    }
  }
})
