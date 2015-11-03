(function() {
  var CardList = React.createClass({
    render() {
      function createCard(card) {
        return <tr key={card.id}>
          <td>
            <ReactRouter.Link to={`/cards/${card.id}`}>{card.title}</ReactRouter.Link>
          </td>
          <td className='text-right'>
            <ReactRouter.Link to={`cards/${card.id}/edit`} className='btn btn-default'>Edit</ReactRouter.Link>
          </td>
        </tr>
      }

      return <div>
        <table className='table'>
          <tbody>
            { this.props.cards.map(createCard) }
          </tbody>
        </table>
      </div>;
    }
  });

  window.CardsIndex = React.createClass({
    getInitialState() {
      return {
        loading: true,
        query: null,
        page: 1,
        cards: [
        ],
      }
    },

    componentDidMount() {
      this.searchQuerySource = new Rx.Subject();

      this.searchQuerySource
        .debounce(400)
        .subscribe(queryValue => {
          this.updateCards({ page: 1, query: queryValue });
        });

      this.updateCards({ page: 1, query: this.props.query });
    },


    updateCards(params) {
      this.setState({ loading: true });
      this.setState(params);
      Card.search(params).then((cards) => {
        this.setState({ loading: false, cards: cards });
      });
    },

    searchQueryChanged(event) {
      this.searchQuerySource.onNext(event.target.value);
    },

    goToPage(number) {
      this.updateCards({ query: this.state.query, page: number });
    },


    render() {
      let loadingIndicator = null, pagination = null;
      if ( this.state.loading ) {
        loadingIndicator = <div className='text-center'>
          <i className='material-icons spin'>
            cached
          </i>
        </div>;
      } else if ( this.state.cards.meta ) {
        pagination = <Pagination goTo={this.goToPage} info={this.state.cards.meta.pagination}></Pagination>;
      }

      return <div>
        <div className='row'>
          <h1>
            <div className='pull-right'>
              <ReactRouter.Link to='/cards/new' className='btn btn-default'>
                New card
              </ReactRouter.Link>
            </div>
            Cards
          </h1>
        </div>
        <p></p>
        <div className='row'>
          <form>
            <div className='form-group'>
              <input className='form-control' placeholder='Search…' type='search' defaultValue={this.state.query} onChange={this.searchQueryChanged}/>
            </div>
          </form>
        </div>
        <p></p>
        <div className='row'>
          { loadingIndicator }
          <CardList cards={this.state.cards}/>
          { pagination }
        </div>
      </div>;
    }
  });
})();
