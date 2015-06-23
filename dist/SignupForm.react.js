'use strict';
var React = require('react'),
    FormMixin = require('./mixins/FormMixin');
module.exports = React.createClass({displayName: "exports",
    mixins: [FormMixin],

    render: function () {
        return(
            React.createElement("form", {id: "create-user-form", className: 'cd-form' + (this.props.visible ? '' : ' hidden'), onSubmit: this.submit, ref: "form"}, 
                React.createElement("p", {className: "fieldset form-group"}, 
                    React.createElement("label", {className: "image-replace cd-email", htmlFor: "signin-email"}, React.createElement("i", {className: "fa fa-envelope-o"})), 
                    React.createElement("input", {className: "full-width has-padding has-border", id: "create-email", name: "email", type: "email", placeholder: this.props.__('Email'), required: true, "data-error": this.props.__('Your email is not valid...'), ref: "email"}), 
                    React.createElement("span", {className: "cd-error-message help-block with-errors hidden"})
                ), 
                React.createElement("p", {className: "fieldset form-group"}, 
                    React.createElement("label", {className: "image-replace cd-password", htmlFor: "signin-password"}, React.createElement("i", {className: "fa fa-lock"})), 
                    React.createElement("input", {className: "full-width has-padding has-border", id: "create-password", name: "password", type: "password", placeholder: this.props.__('Password'), required: true, "data-minlength": "6", "data-error": this.props.__('Password must be at least 6 characters'), ref: "password"}), 
                    React.createElement("span", {className: "cd-error-message help-block with-errors hidden"})
                ), 
                React.createElement("p", {className: "fieldset form-group"}, 
                    React.createElement("label", {className: "image-replace cd-password", htmlFor: "signin-password"}, React.createElement("i", {className: "fa fa-lock"})), 
                    React.createElement("input", {className: "full-width has-padding has-border", id: "repeat-password", name: "repeat", type: "password", placeholder: this.props.__('Repeat Password'), required: true, "data-match": "#create-password", "data-match-error": this.props.__('Password does not match previous...'), "data-error": this.props.__('Please repeat your password...')}), 
                    React.createElement("span", {className: "cd-error-message help-block with-errors hidden"})
                ), 
                React.createElement("p", {className: "text-center fieldset"}, 
                    React.createElement("input", {type: "checkbox", id: "remember-me", name: "rememberme", ref: "rememberme"}), 
                    React.createElement("label", {htmlFor: "remember-me"}, "  ", this.props.__('Remember me'))
                ), 
                React.createElement("p", {className: "fieldset form-group text-center"}, 
                    React.createElement("input", {className: "full-width", type: "submit", value: this.props.__('Signup')})
                )
            )
        );
    }
});
