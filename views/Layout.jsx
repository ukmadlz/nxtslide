var React = require('react');


var Layout = React.createClass({
    render: function () {

        return (
            <html>
                <head>
                    <title>{this.props.title}</title>
                    <script src="/controller.js" ></script>
                </head>
                <body>
                    {this.props.children}
                    <hr />
                    <p>
                        <a href="/">Home</a> | <a href="/about">About Us</a>
                    </p>
                </body>
            </html>
        );
    }
});


module.exports = Layout;
