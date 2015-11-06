(function() {

  window.Layout = React.createClass({
    render() {
      return <div>
        <nav className='navbar navbar-inverse navbar-fixed-top'>
          <div className='container'>
            <div className='navbar-header'>
              <a className='navbar-brand' href='#/'>React</a>
            </div>
            <div className='navbar-collapse'>
              <ul className='nav navbar-nav'> <li>
                  <ReactRouter.Link to='/cards'>Cards</ReactRouter.Link>
                </li>
                <li>
                  <ReactRouter.Link to='/about'>About</ReactRouter.Link>
                </li>
              </ul>
              <ul className='nav navbar-nav navbar-right'>
                <li className='dropdown'>
                  <a className='dropdown-toggle' data-toggle='dropdown' href>
                    Switch framework
                    <span className='caret'></span>
                  </a>
                  <ul className='dropdown-menu'>
                    <li>
                      <a href='/angular'>
                        Angular
                      </a>
                    </li>
                    <li>
                      <a href='/ember'>
                        Ember
                      </a>
                    </li>
                    <li>
                      <a href='/riot'>
                        Riot
                      </a>
                    </li>
                    <li>
                      <a href='/react'>
                        React
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <SignInOut />
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className='container'>
          <Flashes />
        </div>
        <div className='container'>
          { this.props.children }
        </div>
      </div>;
    }
  });
})();
