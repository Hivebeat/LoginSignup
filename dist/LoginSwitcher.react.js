'use strict';
var React = require('react'),

    LoginSwitch = React.createClass({displayName: "LoginSwitch",
        clicked: function (e) {
            this.props.handleLoginSwitch(this.props.form);
        },
        render: function () {
            return (React.createElement("li", {id: this.props.id, onClick: this.clicked}, React.createElement("a", {className: this.props.selected ? 'selected' : ''}, this.props.value)));
        }
    });


module.exports = React.createClass({displayName: "exports",
    handleLoginSwitch: function (form) {
        this.props.handleLoginSwitch(form);
    },
    render: function () {
        this.switches = [
            React.createElement(LoginSwitch, {key: "create-user-switch", id: "create-user-switch", form: "create", value: this.props.signupTxt, handleLoginSwitch: this.handleLoginSwitch, selected: this.props.form === 'create', number: 0}),
            React.createElement(LoginSwitch, {key: "login-switch", id: "login-switch", form: "login", value: this.props.loginTxt, handleLoginSwitch: this.handleLoginSwitch, selected: this.props.form === 'login', number: 1})
        ];
        return (
            React.createElement("ul", {className: "cd-switcher"}, 
                this.switches
            )
        );
    }
});
