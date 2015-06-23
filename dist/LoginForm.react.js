'use strict';
var React = require('react'),
    FormMixin = require('./mixins/FormMixin'),

    ForgotBtn = React.createClass({displayName: "ForgotBtn",
        render: function () {
            return (
                React.createElement("button", {type: "button", className: "btn btn-link", onClick: this.props.clickHandler}, this.props.__('Help! I forgot my password!'))
            );
        }
    });

module.exports = React.createClass({displayName: "exports",
    mixins: [FormMixin],

    render: function () {
        return (
            React.createElement("form", {id: "login-form", className: 'cd-form' + (this.props.visible ? '' : ' hidden'), onSubmit: this.submit, ref: "form"}, 
                React.createElement("p", {className: "fieldset form-group"}, 
                    React.createElement("label", {className: "image-replace cd-email", htmlFor: "signin-email"}, React.createElement("i", {className: "fa fa-envelope-o"})), 
                    React.createElement("input", {className: "full-width has-padding has-border", id: "signin-email", name: "email", type: "email", placeholder: this.props.__('Email'), required: true, "data-error": this.props.__('Your email is not valid...'), ref: "email"}), 
                    React.createElement("span", {className: "cd-error-message help-block with-errors hidden"})
                ), 
                React.createElement("p", {className: "fieldset form-group"}, 
                    React.createElement("label", {className: "image-replace cd-password", htmlFor: "signin-password"}, React.createElement("i", {className: "fa fa-lock"})), 
                    React.createElement("input", {className: "full-width has-padding has-border", id: "signin-password", name: "password", type: "password", placeholder: this.props.__('Password'), required: true, "data-error": this.props.__('Please input a password..'), ref: "password"}), 
                    React.createElement("span", {className: "cd-error-message help-block with-errors hidden"})
                ), 
                React.createElement("p", {className: "text-center fieldset"}, 
                    React.createElement("input", {type: "checkbox", id: "remember-me", name: "rememberme", ref: "rememberme"}), 
                    React.createElement("label", {htmlFor: "remember-me"}, "  ", this.props.__('Remember me'))
                ), 
                React.createElement("p", {className: "fieldset form-group text-center"}, 
                    React.createElement("input", {className: "full-width", type: "submit", value: this.props.__('Login')})
                ), 
                React.createElement("p", {className: "text-center"}, 
                  React.createElement(ForgotBtn, {clickHandler: this.props.forgotHandler, __: this.props.__})
                )
            )
        );
    }
});
