(function() {
  class Flash {
    constructor() {
      var currentFlashes = []
      this.flashes = new Rx.BehaviorSubject([]);
      this.queue = new Rx.Subject();


      this.queue
        .do(flash => {
          currentFlashes.push(flash);
          this.flashes.onNext(currentFlashes)
        })
        .delay(3000)
        .subscribe(flash => {
          currentFlashes.splice(0, 1);
          this.flashes.onNext(currentFlashes);
        });
    }

    success(message) {
      this.queue.onNext({
        severity: 'success',
        message
      });
    }

    warn(message) {
      this.queue.onNext({
        severity: 'warning',
        message
      });
    }
  }

  window.flash = new Flash();
})();
