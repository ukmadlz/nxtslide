var React = require('react');


var Layout = React.createClass({
    render: function () {

        return (
            <html>
                <head>
                    <title>{this.props.title}</title>
                </head>
                <body>
                    {this.props.children}
                    <hr />
                    <p>
                        <a href="/">Home</a> | <a href="/about">About Us</a> | <a href="/login" >Login</a>
                    </p>
                </body>
            </html>
        );
    }
});


module.exports = Layout;
