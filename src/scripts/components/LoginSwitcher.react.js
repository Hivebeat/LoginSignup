'use strict';
var React = require('react'),

    LoginSwitch = React.createClass({
        clicked: function (e) {
            this.props.handleLoginSwitch(this.props.form);
        },
        render: function () {
            return (<li id={this.props.id} onClick={this.clicked}><a className={this.props.selected ? 'selected' : ''}>{this.props.value}</a></li>);
        }
    });


module.exports = React.createClass({
    handleLoginSwitch: function (form) {
        this.props.handleLoginSwitch(form);
    },
    render: function () {
        this.switches = [
            <LoginSwitch key='create-user-switch' id='create-user-switch' form='create' value={this.props.signupTxt} handleLoginSwitch={this.handleLoginSwitch} selected={this.props.form === 'create'} number={0}/>,
            <LoginSwitch key='login-switch' id='login-switch' form='login' value={this.props.loginTxt} handleLoginSwitch={this.handleLoginSwitch} selected={this.props.form === 'login'} number={1}/>
        ];
        return (
            <ul className='cd-switcher'>
                {this.switches}
            </ul>
        );
    }
});
