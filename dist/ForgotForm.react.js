'use strict';
var React = require('react'),
    FormMixin = require('./mixins/FormMixin');
module.exports = React.createClass({displayName: "exports",
    mixins: [FormMixin],
    render: function () {
        return(
            React.createElement("div", null, 
                React.createElement("div", {className: "container"}, 
                  React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "col-md-6 text-center"}, 
                      React.createElement("h3", null, this.props.__('No worries!')), 
                      React.createElement("p", null, React.createElement("small", null, this.props.__('Write your email under here and we\'ll shoot you an email')))
                    )
                  )
                ), 
                React.createElement("form", {id: "forgot-form", className: "cd-form", ref: "form", onSubmit: this.submit}, 
                    React.createElement("p", {className: "fieldset form-group"}, 
                        React.createElement("label", {className: "image-replace cd-email", htmlFor: "forgot-email"}, React.createElement("i", {className: "fa fa-envelope-o"})), 
                        React.createElement("input", {className: "full-width has-padding has-border", id: "forgot-email", name: "email", type: "email", placeholder: this.props.__('Email'), required: true, "data-error": this.props.__('Your email is not valid...'), ref: "email"}), 
                        React.createElement("span", {className: "cd-error-message help-block with-errors hidden"})
                    ), 
                    React.createElement("p", {className: "fieldset form-group text-center"}, 
                        React.createElement("input", {className: "full-width", type: "submit", value: this.props.__('Send me an email!')})
                    )
                )
            )
        );
    }
});
