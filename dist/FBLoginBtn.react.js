'use strict';
var $ = require('jquery'),
    React = require('react'),
    _gaq = window._gaq || undefined,
    FB = window.FB || undefined;
module.exports = React.createClass({displayName: "exports",
    click: function () {
        if (_gaq !== undefined) {
            _gaq.push(['_trackEvent', 'LoginModal', 'fblogin', window.location.pathname]);
        }
        if (!FB) {
            throw 'FB is not defined! Please load the Facebook SDK';
        }
        this.props.toggleLoader();
        FB.init({
            appId       : '251682631638868',
            status      : true,
            cookie      : true,
            fileUpload  : true,
            version     : 'v2.1'
        });
        FB.login(function(resp){
            this.props.callback(resp);
        }.bind(this), {scope: this.props.scope});
    },
    render: function () {
        return (
            React.createElement("button", {className: "cd-button cd-button-fb btn-block", onClick: this.click}, this.props.text)
        );
    }
});
