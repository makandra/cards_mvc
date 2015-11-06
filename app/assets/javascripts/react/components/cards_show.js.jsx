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
      createPage = (page, index) => {
        return <Tabs.Tab key={ index } title={ index + 1 }>
          <div className='body' dangerouslySetInnerHTML={{__html: page.body }} />
        </Tabs.Tab>;
      };

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
          <Tabs>
            { [this.state.card].concat(this.state.card.extra_pages || []).map(createPage) }
          </Tabs>
        </div>;
      } else {
        return <div />;
      }
    }
  });
})();
