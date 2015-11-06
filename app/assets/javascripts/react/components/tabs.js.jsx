(function() {


  window.Tabs = React.createClass({
    getInitialState() {
      return {
        activeTabKey: null
      };
    },


    activateTab(event, tabInfo) {
      event.preventDefault();
      if ( tabInfo.onClick ) {
        if ( tabInfo.onClick() === false ) {
          return;
        }
      }
      this.setState({
        activeTabKey: tabInfo.key
      });
    },

    render() {
      let tabs = [], activeTab;
      React.Children.forEach(this.props.children, (child) => {
        if ( child.type = Tabs.Tab ) {
          let tabInfo = {
            title: child.props.title,
            key: child.key || `_tab_${tabs.length}`,
            content: child,
            onClick: child.props.onClick,
          };
          tabs.push(tabInfo);
          if ( tabInfo.key === this.state.activeTabKey ) {
            activeTab = tabInfo;
          }
        }
      });

      if ( !activeTab ) {
        activeTab = tabs[0];
        this.state.activeTabKey = activeTab && activeTab.key;
      }
      activeTab.active = true;

      createTabNav = tabInfo => {
        return <li className={ tabInfo.active ? 'active' : null } key={ tabInfo.key }>
          <a href='' onClick={ event => this.activateTab(event, tabInfo) }>{ tabInfo.title }</a>
        </li>;
      };

      createTabContents = tabInfo => {
        return <div className={ tabInfo.active ? null : 'hidden' } key={ tabInfo.key }>
          { tabInfo.content }
        </div>;
      };

      return <div>
        <ul className='nav nav-tabs'>
          { tabs.map(createTabNav) }
        </ul>
        { tabs.map(createTabContents) }
      </div>;
    }
  });

  window.Tabs.Tab = React.createClass({
    render() {
      return <div className='tab-pane'>
        { this.props.children }
      </div>;
    }
  });
})();
