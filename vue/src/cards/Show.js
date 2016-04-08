import Vue from 'vue'
import CardService from '../services/card_service.js'

export default Vue.extend({
  data() {
    return {
      card: {}
    };
  },

  template: '#vue/cards/show',

  route: {
    data() {
      return {
        card: CardService.find(this.$route.params.card_id),
      }
    }
  },
})
