(function() {

  window.IfSignedIn = React.createClass({
    componentWillMount() {
      this.signInStateSubscription = session.signInState.subscribe(signedIn => {
        this.setState( { signedIn });
      });
    },

    componentWillUnmount() {
      this.signInStateSubscription.dispose();
    },

    render() {
      return <span>
        { this.state.signedIn ? this.props.children : null }
      </span>;
    }
  });

})();
