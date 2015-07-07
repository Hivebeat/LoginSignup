'use strict';
var $ = require('jquery'),
    React = require('react');

if (typeof window !== 'undefined') {
  var _gaq = window._gaq || undefined;
}

module.exports = React.createClass({
    click: function () {
        if (_gaq !== undefined) {
            _gaq.push(['_trackEvent', 'LoginModal', 'fblogin', window.location.pathname]);
        }
        if (!window.FB) {
            throw 'FB is not defined! Please load the Facebook SDK';
        }
        var FB = window.FB;
        this.props.toggleLoader();
        FB.login(function(resp){
            this.props.callback(resp);
        }.bind(this), {scope: this.props.scope});
    },
    render: function () {
        return (
            <button className='cd-button cd-button-fb btn-block' onClick={this.click}>{this.props.text}</button>
        );
    }
});
