(function() {

  function buildPages(current, total) {
    const maxWindowSize = 5;
    const maxOffset = (maxWindowSize - 1) / 2; // the maximum distance to the current page we will show

    let pages = [];

    if (current > 1 + maxOffset) {
      pages.push({
        number: 1,
        label: 1
      });
    }
    if (current > 2 + maxOffset) {
      pages.push({
        number: current - maxOffset - 1,
        label: '…'
      });
    }
    for (let i = Math.max(current - maxOffset, 1); i <= Math.min(current + maxOffset, total); i++) {
      pages.push({
        number: i,
        label: i,
        current: i === current
      });
    }
    if (current < total - maxOffset - 1) {
      pages.push({
        number: current + maxOffset + 1,
        label: '…'
      });
    }
    if (current < total - maxOffset) {
      pages.push({
        number: total,
        label: total
      });
    }
    return pages;
  }

  window.Pagination = React.createClass({
    render() {
      var pages = buildPages(this.props.info.current_page, this.props.info.total_pages);

      if ( pages.length > 1 ) {

        createPage = (page) => {
          goToPage = event => {
            event.preventDefault();
            this.props.goTo(page.number);
          }

          return <li key={page.number} className={page.current ? 'active' : null}>
              <a href onClick={goToPage}>{page.label}</a>
            </li>;
        }

        return <ul className='pagination'>
            { pages.map(createPage) }
          </ul>;

      } else {
        return <div />;
      }
    }
  });

})();
