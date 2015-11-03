(function() {
  window.CardsShow = React.createClass({
    getInitialState() {
      return {
        card: null
      };
    },

    componentDidMount() {
      Card.find(this.props.params.cardId)
        .then(card => {
          this.setState({ card: card });
        });
    },

    render() {
      if ( this.state.card ) {
        return <div>
          <h1>
            <div className='pull-right'>
              <ReactRouter.Link to={`/cards/${this.state.card.id}/edit`} className='btn btn-default'>
                Edit
              </ReactRouter.Link>
            </div>
            { this.state.card.title }
          </h1>
          <tabs>
            <tab title='1'>
              <div className='body' dangerouslySetInnerHTML={{__html: this.state.card.body }}></div>
            </tab>
          </tabs>
        </div>;
      } else {
        return <div />;
      }
    }
  });
})();
