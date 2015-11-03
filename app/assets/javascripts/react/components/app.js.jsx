var App = React.createClass({

  render() {
    return <ReactRouter.Router>
      <ReactRouter.Route path='/' component={Layout}>
        <ReactRouter.IndexRedirect to='cards' />
        <ReactRouter.Route path='cards'>
          <ReactRouter.IndexRoute component={CardsIndex} />
          <ReactRouter.Route path='new' component={CardsForm} />
          <ReactRouter.Route path=':cardId'>
            <ReactRouter.IndexRoute component={CardsShow} />
            <ReactRouter.Route path='edit' component={CardsForm} />
          </ReactRouter.Route>
        </ReactRouter.Route>
        <ReactRouter.Route path='about' component={About} />
      </ReactRouter.Route>
    </ReactRouter.Router>;
  }
});
