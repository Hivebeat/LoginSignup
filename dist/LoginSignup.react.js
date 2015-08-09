'use strict';

var React = require('react'),
    $ = require('jquery'),
    SignupForm = require('./SignupForm.react'),
    LoginForm = require('./LoginForm.react'),
    ForgotForm = require('./ForgotForm.react'),
    LoginSwitcher = require('./LoginSwitcher.react'),
    EventText = require('./EventText.react'),
    FBLoginBtn = require('./FBLoginBtn.react');

if (typeof window !== 'undefined') {
  var _gaq = window._gaq || undefined;
}

var NoThanksBtn = React.createClass({displayName: "NoThanksBtn",
        clicked: function () {
            if (_gaq !== undefined) {
                _gaq.push(['_trackEvent', 'LoginModal', 'no-fb', window.location.pathname]);
            }
            this.props.handleClick();
        },
        render: function () {
            return (
                React.createElement("p", {id: "no-thx-txt", className: 'text-center create-user-hide' + (this.props.visible ? '' : ' hidden')}, React.createElement("button", {className: "btn-link", id: "no-thanks-btn", onClick: this.clicked}, this.props.noThx, ","), this.props.text)
            );
        }
    });

module.exports = React.createClass({displayName: "exports",
    propTypes: {
        signup: React.PropTypes.func.isRequired,
        login: React.PropTypes.func.isRequired,
        forgot: React.PropTypes.func.isRequired,
        fblogin: React.PropTypes.func.isRequired,
        triggerId: React.PropTypes.string.isRequired
    },

    getInitialState: function () {
        return {
            form: 'create',
            formVisible: false,
            loaderVisible: false,
            isVisible: false
        };
    },
    componentDidMount: function () {
        if (this.props.form !== this.state.form) {
            this.setState({
                form: this.props.form
            });
        }
        if (this.props.isVisible) {
          this.setState({
            isVisible: this.props.isVisible
          });
        }
        $('#'+this.props.triggerId).click(function () {
            this.setState({
                isVisible: true
            });
        }.bind(this));
    },
    handleLoginSwitch: function (form) {
        var state = this.state;
        state.form = form;
        state.formVisible = false;
        this.setState(state);
    },
    showForm: function () {
        var state = this.state;
        state.formVisible = true;
        this.setState(state);
    },
    toggleLoader: function () {
        var state = this.state;
        state.loaderVisible = !this.state.loaderVisible;
        this.setState(state);
    },
    showForgot: function () {
        var state = this.state;
        state.form = 'forgot';
        this.setState(state);
    },
    clicked: function (e) {
        if(e.target === e.currentTarget) {
            this.setState({isVisible: false});
        }
    },
    render: function () {
      
        var __ = function (str) {
            if(!this.props.messages) {
                return str;
            }
            return this.props.messages[str] || str;
        }.bind(this);

        var forms = {
            create: React.createElement(SignupForm, {
                        __: __, 
                        submit: this.props.signup, 
                        visible: this.state.formVisible, 
                        toggleLoader: this.toggleLoader}),
            login: React.createElement(LoginForm, {
                        __: __, 
                        submit: this.props.login, 
                        visible: this.state.formVisible, 
                        toggleLoader: this.toggleLoader, 
                        forgotHandler: this.showForgot}),
            forgot: React.createElement(ForgotForm, {
                        __: __, 
                        submit: this.props.forgot, 
                        toggleLoader: this.toggleLoader})
        },
        noThanksBtns = {
            create: React.createElement(NoThanksBtn, {
                        noThx: __('No thanks'), 
                        text: __('I do not want to signup using Facebook'), 
                        handleClick: this.showForm, 
                        visible: !this.state.formVisible}),
            login: React.createElement(NoThanksBtn, {
                        noThx: __('No thanks'), 
                        text: __('I do not want to login using Facebook'), 
                        handleClick: this.showForm, 
                        visible: !this.state.formVisible})
            },
        fbLoginBtns = {
            create: React.createElement(FBLoginBtn, {
                        scope: this.props.fbloginscope, 
                        callback: this.props.fblogin, 
                        text: __('Signup using Facebook'), 
                        toggleLoader: this.toggleLoader}),
            login: React.createElement(FBLoginBtn, {
                        scope: this.props.fbloginscope, 
                        callback: this.props.fblogin, 
                        text: __('Login using Facebook'), 
                        toggleLoader: this.toggleLoader})
        };
        var eventText = (this.state.form === 'create' && this.props.createEvent) ? React.createElement(EventText, null) : '';
        return (
            React.createElement("div", {id: "gt-create-user-modal", className: 'cd-user-modal ' + (this.state.isVisible ? 'is-visible' : ''), onClick: this.clicked}, 
                React.createElement("div", {className: "cd-user-modal-container"}, 
                    React.createElement(LoginSwitcher, {
                        loginTxt: __('Login'), 
                        signupTxt: __('Signup'), 
                        handleLoginSwitch: this.handleLoginSwitch, 
                        form: this.state.form}), 
                    React.createElement("div", {id: "cd-login is-visible"}, 
                        React.createElement("br", null), 
                        eventText, 
                        fbLoginBtns[this.state.form], 
                        React.createElement("br", null), 
                        React.createElement("div", {id: "spinner", className: 'spinner' + (this.state.loaderVisible ? '' : ' hidden')}, 
                            React.createElement("div", {className: "double-bounce1"}), 
                            React.createElement("div", {className: "double-bounce2"})
                        ), 
                        noThanksBtns[this.state.form], 
                        React.createElement("br", null), 
                        React.createElement("div", {id: "form-container"}, forms[this.state.form])
                    )
                )
            )
        );
    }
});
