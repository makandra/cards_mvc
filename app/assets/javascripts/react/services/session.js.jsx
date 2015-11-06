(function() {
  class Session {
    constructor() {
      this.signInState = new Rx.BehaviorSubject(false);
    }

    signIn() {
      $.post('/api/session')
        .then(() => {
          this.signInState.onNext(true);
          flash.success('Signed in');
        });
    }

    signOut() {
      $.ajax({
        url: '/api/session',
        type: 'DELETE'
      })
        .then(() => {
          this.signInState.onNext(false);
          flash.success('Signed out');
        });
    }

    set(value) {
      this.signInState.onNext(value);
    }
  };

  window.session = new Session();
})();
