(function() {

  window.CkEditor = React.createClass({
    render() {
      return <textarea className={ this.props.className } name={ this.props.name }/>;
    },

    componentDidMount() {
      let node = ReactDOM.findDOMNode(this);
      let editor = CKEDITOR.replace(node);
      this.editorReady = new Rx.AsyncSubject();

      editor.setData(this.props.value, () => {
        this.editorValue = this.props.value;
        this.editorReady.onNext(editor);
        this.editorReady.onCompleted();
      });

      editor.on('change', () => {
        if ( this.props.onChange ) {
          this.editorValue = editor.getData();
          this.props.onChange(this.editorValue);
        }
      });

    },

    componentWillReceiveProps(newProps) {
      this.editorReady.subscribe(editor => {
        let newValue = newProps.value;
        if ( newValue != this.editorValue ) {
          this.editorValue = newValue;
          editor.setData(newValue);
        }
      });
    },

    componentWillUnmount() {
      this.editorReady.subscribe(editor => {
        editor.destroy();
      });
    }
  });

})();
