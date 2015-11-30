// Controller layout template
var React = require('react');

var Controller = React.createClass({

  render: function() {

    return(
        <html>
          <head>
            <title>{this.props.title}</title>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossOrigin="anonymous" />
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossOrigin="anonymous" />
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" />
          </head>
          <body>
            <div className="container-fluid text-center" >
              <div className="row" >
                <div className="col-xs-12" >
                  <a className="btn btn-primary btn-lg direction-control" data-direction="up" >
                    <i className="fa fa-angle-up" ></i>
                    <br/>
                    Up
                  </a>
                </div>
              </div>
              <div className="row" >
                <div className="col-xs-6" >
                  <a className="btn btn-primary btn-lg direction-control" data-direction="left" >
                    <i className="fa fa-angle-left" ></i> Left
                  </a>
                </div>
                <div className="col-xs-6" >
                  <a className="btn btn-primary btn-lg direction-control" data-direction="right" >
                    Right <i className="fa fa-angle-right" ></i>
                  </a>
                </div>
              </div>
              <div className="row" >
                <div className="col-xs-12" >
                  <a className="btn btn-primary btn-lg direction-control" data-direction="down" >
                    Down
                    <br/>
                    <i className="fa fa-angle-down" ></i>
                  </a>
                </div>
              </div>
            </div>
            <script src="https://code.jquery.com/jquery-2.1.4.min.js" ></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossOrigin="anonymous"></script>
            <script src="/controller-app.js" ></script>
        </body>
        </html>
      );
  }
});

module.exports = Controller;
