(function() {
  class Session {
    constructor() {
      this.signInState = new Rx.BehaviorSubject(false);
    }

    signIn() {
      $.post('/api/session')
        .then(() => {
          this.signInState.onNext(true);
        });
    }

    signOut() {
      $.ajax({
        url: '/api/session',
        type: 'DELETE'
      })
        .then(() => {
          this.signInState.onNext(false);
        });
    }

    set(value) {
      this.signInState.onNext(value);
    }
  };

  window.session = new Session();
})();
