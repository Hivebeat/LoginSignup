'use strict';

var React = require('react'),
    $ = require('jquery'),
    validator = require('bootstrap-validator'),
    SignupForm = require('./SignupForm.react'),
    LoginForm = require('./LoginForm.react'),
    ForgotForm = require('./ForgotForm.react'),
    LoginSwitcher = require('./LoginSwitcher.react'),
    EventText = require('./EventText.react'),
    FBLoginBtn = require('./FBLoginBtn.react'),

    _gaq = window._gaq || undefined,

    NoThanksBtn = React.createClass({
        clicked: function () {
            if (_gaq !== undefined) {
                _gaq.push(['_trackEvent', 'LoginModal', 'no-fb', window.location.pathname]);
            }
            this.props.handleClick();
        },
        render: function () {
            return (
                <p id='no-thx-txt' className={'text-center create-user-hide' + (this.props.visible ? '' : ' hidden')}><button className='btn-link' id='no-thanks-btn' onClick={this.clicked}>{this.props.noThx},</button>{this.props.text}</p>
            );
        }
    });

module.exports = React.createClass({
    propTypes: {
        signup: React.PropTypes.func.isRequired,
        login: React.PropTypes.func.isRequired,
        forgot: React.PropTypes.func.isRequired,
        fblogin: React.PropTypes.func.isRequired,
        __: React.PropTypes.func
    },

    getDefaultProps: function () {
        return {
            __: function (str) {return str;}
        };
    },
    getInitialState: function () {
        return {form: this.props.form || 'create', formVisible: false, loaderVisible: false, isVisible: false};
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
    render: function () {
        var forms = {
            create: <SignupForm
                        __={this.props.__}
                        submit={this.props.signup}
                        visible={this.state.formVisible}
                        toggleLoader={this.toggleLoader}/>,
            login: <LoginForm
                        __={this.props.__}
                        submit={this.props.login}
                        visible={this.state.formVisible}
                        toggleLoader={this.toggleLoader}
                        forgotHandler={this.showForgot}/>,
            forgot: <ForgotForm
                        __={this.props.__}
                        submit={this.props.forgot}
                        toggleLoader={this.toggleLoader}/>
        },
        noThanksBtns = {
            create: <NoThanksBtn
                        noThx={this.props.__('No thanks')}
                        text={this.props.__('I do not want to signup using Facebook')}
                        handleClick={this.showForm}
                        visible={!this.state.formVisible}/>,
            login: <NoThanksBtn
                        noThx={this.props.__('No thanks')}
                        text={this.props.__('I do not want to login using Facebook')}
                        handleClick={this.showForm}
                        visible={!this.state.formVisible}/>
            },
        fbLoginBtns = {
            create: <FBLoginBtn
                        text={this.props.__('Signup using Facebook')}
                        toggleLoader={this.toggleLoader}/>,
            login: <FBLoginBtn
                        submit={this.props.fblogin}
                        text={this.props.__('Login using Facebook')}
                        toggleLoader={this.toggleLoader}/>
        };
        var eventText = (this.state.form === 'create' && this.props.createEvent) ? <EventText /> : '';
        return (
            <div id='gt-create-user-modal' className={'cd-user-modal' + (this.state.isVisible ? 'is-visible' : '')}>
                <div className='cd-user-modal-container'>
                    <LoginSwitcher
                        loginTxt={this.props.__('Login')}
                        signupTxt={this.props.__('Signup')}
                        handleLoginSwitch={this.handleLoginSwitch}
                        form={this.state.form}/>
                    <div id='cd-login is-visible'>
                        <br />
                        {eventText}
                        {fbLoginBtns[this.state.form]}
                        <br />
                        <div id='spinner' className={'spinner' + (this.state.loaderVisible ? '' : ' hidden')}>
                            <div className='double-bounce1'></div>
                            <div className='double-bounce2'></div>
                        </div>
                        {noThanksBtns[this.state.form]}
                        <br />
                        <div id='form-container'>{forms[this.state.form]}</div>
                    </div>
                </div>
            </div>
        );
    }
});
