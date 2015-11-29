// Default layout template
var React = require('react');
var Layout = require('./Layout');

var Default = React.createClass({

  render: function() {

    return(
        <Layout title={this.props.title}>
          <h1>{this.props.message}</h1>
        </Layout>
      );
  }
});

module.exports = Default;
