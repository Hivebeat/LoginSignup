'use strict';

var React = require('react'),
    $ = require('jquery'),
    swal = require('sweetalert'),
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
                <p id='no-thx-txt' className={'text-center create-user-hide' + (this.props.visible ? '' : ' hidden')}><button className='btn-link' id='no-thanks-btn' onClick={this.clicked}>Nej tak,</button>{this.props.text}</p>
            );
        }
    });

module.exports = React.createClass({
    getInitialState: function () {
        return {form: this.props.form || 'create', formVisible: false, loaderVisible: false};
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
    signup: function (d) {
        console.log(d);
    },
    login: function (d) {
        console.log(d);
    },
    forgot: function (d) {
        console.log(d);
    },
    fblogin: function (d) {
        console.log(d);
    },
    render: function () {
        var forms = {
            create: <SignupForm submit={this.signup} visible={this.state.formVisible} toggleLoader={this.toggleLoader}/>,
            login: <LoginForm submit={this.login} visible={this.state.formVisible} toggleLoader={this.toggleLoader} forgotHandler={this.showForgot}/>,
            forgot: <ForgotForm submit={this.forgot} toggleLoader={this.toggleLoader}/>
        },
        noThanksBtns = {
            create: <NoThanksBtn text='jeg vil hellere oprette min bruger uden Facebook' handleClick={this.showForm} visible={!this.state.formVisible}/>,
            login: <NoThanksBtn text='jeg vil hellere bruge mit Greenticket login' handleClick={this.showForm} visible={!this.state.formVisible}/>
        },
        fbLoginBtns = {
            create: <FBLoginBtn text='Opret bruger med Facebook' toggleLoader={this.toggleLoader}/>,
        login: <FBLoginBtn submit={this.fblogin} text='Login med Facebook' toggleLoader={this.toggleLoader}/>
        };
        var eventText = (this.state.form === 'create' && this.props.createEvent) ? <EventText /> : '';
        return (
            <div id='gt-create-user-modal' className='cd-user-modal is-visible'>
                <div className='cd-user-modal-container'>
                    <LoginSwitcher handleLoginSwitch={this.handleLoginSwitch} form={this.state.form}/>
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
