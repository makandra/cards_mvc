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
      return <div className= { `form-group ${errors[field] ? 'has-error' : null}` }>
        <label className='control-label'>
          { label }
        </label>
        { input }
        <span className='text-danger'>
          { errors[field] ? errors[field][0] : null }
        </span>
      </div>;
    },

    handleFieldChange(model, field, value) {
      this.state[model][field] = value;
      this.setState({ [model]: this.state[model] });
    },

    renderTextField(model, field, options) {
      return this.renderField(model, field, options,
        <input className='form-control' name='title' value={ this.state[model][field] } onChange={ (event) => this.handleFieldChange(model, field, event.target.value) } type='text' />
      );
    },

    renderWysiwygField(model, field, options) {
      return this.renderField(model, field, options,
        <CkEditor className='form-control' name='body' value={ this.state[model][field] } onChange={ (value) => this.handleFieldChange(model, field, value) } type='text' />
      );
    },


    render() {
      handleSubmit = (event) => {
        event.preventDefault();

        this.state.card.save()
          .then(() => {
            this.props.history.pushState(null, '/cards');
          }, (errors) => {
            this.setState({ errors: errors });
          });
      }

      handleDestroy = (event) => {
        this.state.card.destroy()
          .then(() => {
            this.props.history.pushState(null, '/cards');
          });
      }

      if ( this.state.card ) {
        return <form name='cardForm' onSubmit={ handleSubmit }>
          { this.renderTextField('card', 'title', { label: 'Titel' }) }
          <div className='form-group' errors-for='body'>
            <tabs>
              <tab title='1'>
                { this.renderWysiwygField('card', 'body', { label: 'Body' }) }
              </tab>
            </tabs>
          </div>
          <button className='btn btn-primary' type='submit'>
            { this.state.card.id ? "Update" : "Create" }
          </button>
          <button className='btn btn-danger' type='button' onClick={ handleDestroy }>
            Delete
          </button>
        </form>;
      } else {
        return <div />;
      }
    }
  });

})();
