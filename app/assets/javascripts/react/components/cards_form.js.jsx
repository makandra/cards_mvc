(function() {

  window.CardsForm = React.createClass({
    getInitialState() {
      return {
        card: null,
        errors: {}
      };
    },

    componentDidMount() {
      var id = this.props.params.cardId;
      if ( id ) {
        Card.find(id)
          .then(card => {
            this.setState({ card: card });
          });
      } else {
        this.setState({ card: new Card() });
      }
    },


    renderField(model, field, { label }, input) {
      var errors = this.state.errors;
      var labelTag = null;
      if ( label) {
        labelTag = <label className='control-label'>
          { label }
        </label>;
      }
      return <div className= { `form-group ${errors[field] ? 'has-error' : null}` }>
        { labelTag }
        { input }
        <span className='text-danger'>
          { errors[field] ? errors[field][0] : null }
        </span>
      </div>;
    },

    handleFieldChange(model, field, value) {
      model[field] = value;
      this.setState(this.state);
    },

    renderTextField(model, field, options) {
      return this.renderField(model, field, options,
        <input className='form-control' name='title' value={ model[field] } onChange={ (event) => this.handleFieldChange(model, field, event.target.value) } type='text' />
      );
    },

    renderWysiwygField(model, field, options) {
      return this.renderField(model, field, options,
        <CkEditor className='form-control' name='body' value={ model[field] } onChange={ (value) => this.handleFieldChange(model, field, value) } type='text' />
      );
    },


    render() {
      let handleSubmit = (event) => {
        event.preventDefault();

        this.state.card.save()
          .then(() => {
            this.props.history.pushState(null, '/cards');
          }, (errors) => {
            this.setState({ errors: errors });
          });
      };

      let handleDestroy = (event) => {
        this.state.card.destroy()
          .then(() => {
            this.props.history.pushState(null, '/cards');
          });
      };

      renderExtraPage = (page, index) => {
        let handleRemovePage = (event) => {
          event.preventDefault();
          this.state.card.extra_pages.splice(index, 1);
          this.setState({ card: this.state.card });
        }

        return <Tabs.Tab title={ index + 2 } key={ index }>
          { this.renderWysiwygField(page, 'body', {}) }
          <a href='' onClick={ handleRemovePage }>
            Remove page
          </a>
        </Tabs.Tab>;
      };

      handleAddPage = () => {
        this.state.card.extra_pages.push({ body: '' });
        this.setState({ card: this.state.card });
        return false;
      }

      if ( this.state.card ) {
        return <div>
          <h1>
            { this.state.card.id ? 'Edit card' : 'New card' }
          </h1>
          <form onSubmit={ handleSubmit }>
            { this.renderTextField(this.state.card, 'title', { label: 'Titel' }) }
            <div className='form-group' errors-for='body'>
              <Tabs>
                <Tabs.Tab title='1' >
                  { this.renderWysiwygField(this.state.card, 'body', {}) }
                </Tabs.Tab>
                { (this.state.card.extra_pages || []).map(renderExtraPage) }
                <Tabs.Tab title='+' onClick={ handleAddPage }/>
              </Tabs>
            </div>
            <button className='btn btn-primary' type='submit'>
              { this.state.card.id ? "Update" : "Create" }
            </button>
            <button className='btn btn-danger' type='button' onClick={ handleDestroy }>
              Delete
            </button>
          </form>
        </div>;
      } else {
        return <div />;
      }
    }
  });

})();
