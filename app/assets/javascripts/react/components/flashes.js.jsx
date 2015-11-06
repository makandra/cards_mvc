(function() {
  window.Flashes = React.createClass({
    componentWillMount() {
      this.flashesSubscription = flash.flashes.subscribe((flashes) => {
        this.setState({ flashes });
      });
    },

    componentWillUnmount() {
      this.flashesSubscription.dispose();
    },

    render() {
      createFlash = (flash, index) => {
        return <div key={ index } className='row'>
          <div className={ `alert alert-${flash.severity}` }>
            { flash.message }
          </div>
        </div>;
      };

      return <div className='flashes'>
        { this.state.flashes.map(createFlash) }
      </div>;
    }
  });
})();
