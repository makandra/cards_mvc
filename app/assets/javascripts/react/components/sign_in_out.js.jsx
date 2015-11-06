(function() {

  window.SignInOut = React.createClass({
    componentWillMount() {
      this.signInStateSubscription = session.signInState.subscribe(signedIn => {
        this.setState( { signedIn });
      });
    },

    componentWillUnmount() {
      this.signInStateSubscription.dispose();
    },


    signIn(event) {
      event.preventDefault();
      session.signIn();
    },

    signOut(event) {
      event.preventDefault();
      session.signOut();
    },

    render() {
      if ( this.state.signedIn ) {
        return <a href='' onClick={ this.signOut }>Sign out</a>;
      } else {
        return <a href='' onClick={ this.signIn }>Sign in</a>;
      }
    }
  });

})();
