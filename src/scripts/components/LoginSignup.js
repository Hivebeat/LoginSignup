/*global _gaq, FB*/
'use strict';

var React = require('react');
var $ = require('jquery');
var swal = require('sweetalert');
var validator = require('bootstrap-validator');
var User = require('../lib/User');
var _gaq = _gaq || undefined;

var CreateUserModal = React.createClass({
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
    render: function () {
        var forms = {
            create: <CreateUserModal.CreateUserForm visible={this.state.formVisible} toggleLoader={this.toggleLoader}/>,
            login: <CreateUserModal.LoginForm visible={this.state.formVisible} toggleLoader={this.toggleLoader} forgotHandler={this.showForgot}/>,
            forgot: <CreateUserModal.ForgotForm toggleLoader={this.toggleLoader}/>
        },
        noThanksBtns = {
            create: <CreateUserModal.NoThanksBtn text='jeg vil hellere oprette min bruger uden Facebook' handleClick={this.showForm} visible={!this.state.formVisible}/>,
            login: <CreateUserModal.NoThanksBtn text='jeg vil hellere bruge mit Greenticket login' handleClick={this.showForm} visible={!this.state.formVisible}/>
        },
        fbLoginBtns = {
            create: <FBLoginBtn text='Opret bruger med Facebook' toggleLoader={this.toggleLoader}/>,
            login: <FBLoginBtn text='Login med Facebook' toggleLoader={this.toggleLoader}/>
        };
        var eventText = (this.state.form === 'create' && this.props.createEvent) ? <CreateUserModal.EventText /> : '';
        return (
            <div id='gt-create-user-modal' className='cd-user-modal is-visible'>
                <div className='cd-user-modal-container'>
                    <CreateUserModal.LoginSwitcher handleLoginSwitch={this.handleLoginSwitch} form={this.state.form}/>
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

CreateUserModal.EventText = React.createClass({
    render: function () {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 text-center'>
                        <h3>'Dit event er klar om 5 minutter!'</h3>
                        <p><small>'Opret din bruger med Facebook, så slipper du for at huske endnu et kodeord' (<strong>'win!'</strong>).<br />'Vi slår selvfølgelig aldrig noget op uden din tilladelse.'</small></p>
                    </div>
                </div>
            </div>
        );
    }
});


CreateUserModal.LoginSwitcher = React.createClass({
    handleLoginSwitch: function (form) {
        this.props.handleLoginSwitch(form);
    },
    render: function () {
        this.switches = [
            <CreateUserModal.LoginSwitch key='create-user-switch' id='create-user-switch' form='create' value='Opret bruger' handleLoginSwitch={this.handleLoginSwitch} selected={this.props.form === 'create'} number={0}/>,
            <CreateUserModal.LoginSwitch key='login-switch' id='login-switch' form='login' value='Log ind' handleLoginSwitch={this.handleLoginSwitch} selected={this.props.form === 'login'} number={1}/>
        ];
        return (
            <ul className='cd-switcher'>
                {this.switches}
            </ul>
        );
    }
});

CreateUserModal.LoginSwitch = React.createClass({
    clicked: function (e) {
        this.props.handleLoginSwitch(this.props.form);
    },
    render: function () {
        return (<li id={this.props.id} onClick={this.clicked}><a className={this.props.selected ? 'selected' : ''}>{this.props.value}</a></li>);
    }
});

CreateUserModal.ForgotForm = React.createClass({
    submit: function (e) {
        e.preventDefault();
        this.props.toggleLoader();
        var user = new User({
            email: this.refs.email.getDOMNode().value.trim(),
            url: 'https://greenticket.dk'
        });
        user.sendForgotMail()
        .then(function (resp) {
            this.props.toggleLoader();
        });
    },
    render: function () {
        return(
            <div>
                <div className='container'>
                  <div className='row'>
                    <div className='col-md-6 text-center'>
                      <h3>'No worries!'</h3>
                      <p><small>'Skriv din email herunder, så sender vi en mail til dig, så du kan oprette en ny!'</small></p>
                    </div>
                  </div>
                </div>
                <form className='cd-form' ref='form' onSubmit={this.submit}>
                    <p className='fieldset form-group'>
                        <label className='image-replace cd-email' htmlFor='forgot-email'><i className='fa fa-envelope-o'></i></label>
                        <input className='full-width has-padding has-border' id='forgot-email' name='email' type='email' placeholder='Email' data-error='Din email er ikke en rigtig email adresse...' ref='email'/>
                        <span className='cd-error-message help-block with-errors hidden'></span>
                    </p>
                    <p className='fieldset form-group'>
                        <input className='full-width' type='submit' value='Smid mig en mail!'/>
                    </p>
                </form>
            </div>
        );
    }
});

CreateUserModal.CreateUserForm = React.createClass({
    componentDidMount: function () {
        this.$form = $('#'+this.refs.form.getDOMNode().id);
        this.$form.validator();
    },
    loginCallback: function (data) {
        this.props.toggleLoader();
        if (data === this.user.email) {
            window.location = GT.LOGIN_LOCATION;
            return;
        }
        swal({
            title: _('Ups!'),
            text: _('Der skete en fejl...'),
            type: 'error',
            confirmButtonColor: '#ACD762'
        });
    },
    createUserCallback: function (data) {
        if (data.errno) {
            this.props.toggleLoader();
            if (data.errno === 1062) {
                swal({
                    title: _('Ups!'),
                    text: _('Der findes allerede en bruger med denne email adresse...'),
                    type: 'error',
                    confirmButtonColor: '#ACD762'
                });
            }
            return;
        }
        this.user.authenticate()
        .then(this.loginCallback.bind(this));
    },
    createUser: function (e) {
        if (_gaq !== undefined) {
            _gaq.push(['_trackEvent', 'LoginModal', 'gtcreate', window.location.pathname]);
        }
        e.preventDefault();
        this.props.toggleLoader();
        var data = {
            email: this.refs.email.getDOMNode().value.trim(),
            password: this.refs.password.getDOMNode().value,
            url: 'http://greenticket.dk',
            rememberMe: this.refs.rememberme.getDOMNode().checked ? 'ON' : 'OFF'
        };
        this.user = new User(data);
        this.user.create()
        .then(this.createUserCallback.bind(this));
    },
    render: function () {
        return(
            <form id='create-user-form' className={'cd-form' + (this.props.visible ? '' : ' hidden')} onSubmit={this.createUser} ref='form'>
                <p className='fieldset form-group'>
                    <label className='image-replace cd-email' htmlFor='signin-email'><i className='fa fa-envelope-o'></i></label>
                    <input className='full-width has-padding has-border' id='create-email' name='email' type='email' placeholder='Email' data-error='Din email er ikke en rigtig email adresse...' ref='email'/>
                    <span className='cd-error-message help-block with-errors hidden'></span>
                </p>
                <p className='fieldset form-group'>
                    <label className='image-replace cd-password' htmlFor='signin-password'><i className='fa fa-lock'></i></label>
                    <input className='full-width has-padding has-border' id='create-password' name='password' type='password' placeholder='Password' data-minlength='6' data-error='Password skal være minimum 6 karatérer...' ref='password'/>
                    <span className='cd-error-message help-block with-errors hidden'></span>
                </p>
                <p className='fieldset form-group'>
                    <label className='image-replace cd-password' htmlFor='signin-password'><i className='fa fa-lock'></i></label>
                    <input className='full-width has-padding has-border' id='repeat-password' name='repeat' type='password' placeholder='Gentag Password' required data-match='#create-password' data-match-error='Password passer ikke med det første...' data-error='Du skal gentage dit password' />
                    <span className='cd-error-message help-block with-errors hidden'></span>
                </p>
                <p className='text-center fieldset'>
                    <input type='checkbox' id='remember-me' name='rememberme' ref='rememberme'/>
                    <label htmlFor='remember-me'>&nbsp; Husk mig</label>
                </p>
                <p className='fieldset form-group'>
                    <input className='full-width' type='submit' value='Opret bruger' />
                </p>
            </form>
        );
    }
});

CreateUserModal.LoginForm = React.createClass({
    componentDidMount: function () {
        this.$form = $('#'+this.refs.form.getDOMNode().id);
        this.$form.validator();
    },
    loginCallback: function (data) {
        this.props.toggleLoader();
        if (data === this.user.email) {
            window.location = this.props.loginLocation;
            return;
        }
        swal({
            title: 'Ups!',
            text: 'Forkert kode eller email adresse...',
            type: 'error',
            confirmButtonColor: '#ACD762'
        });
    },
    login: function (e) {
        if (_gaq !== undefined) {
            _gaq.push(['_trackEvent', 'LoginModal', 'gtlogin', window.location.pathname]);
        }
        e.preventDefault();
        this.props.toggleLoader();
        var data = {
            email: this.refs.email.getDOMNode().value.trim(),
            password: this.refs.password.getDOMNode().value,
            url: 'http://greenticket.dk',
            rememberMe: this.refs.rememberme.getDOMNode().checked ? 'ON' : 'OFF'
        };
        this.user = new User(data);
        this.user.authenticate()
        .then(this.loginCallback.bind(this));
    },
    render: function () {
        return (
            <form id='login-form' className={'cd-form' + (this.props.visible ? '' : ' hidden')} onSubmit={this.login} ref='form'>
                <p className='fieldset form-group'>
                    <label className='image-replace cd-email' htmlFor='signin-email'><i className='fa fa-envelope-o'></i></label>
                    <input className='full-width has-padding has-border' id='signin-email' name='email' type='email' placeholder='Email' data-error='Din email er ikke en rigtig email adresse...' ref='email'/>
                    <span className='cd-error-message help-block with-errors hidden'></span>
                </p>
                <p className='fieldset form-group'>
                    <label className='image-replace cd-password' htmlFor='signin-password'><i className='fa fa-lock'></i></label>
                    <input className='full-width has-padding has-border' id='signin-password' name='password' type='password' placeholder='Password' required data-error='Du skal indtaste et password...' ref='password'/>
                    <span className='cd-error-message help-block with-errors hidden'></span>
                </p>
                <p className='text-center fieldset'>
                    <input type='checkbox' id='remember-me' name='rememberme' ref='rememberme'/>
                    <label htmlFor='remember-me'>&nbsp; 'Husk mig'</label>
                </p>
                <p className='fieldset form-group'>
                    <input className='full-width' type='submit' value='Login'/>
                </p>
                <p className='text-center'>
                  <CreateUserModal.ForgotBtn clickHandler={this.props.forgotHandler}/>
                </p>
            </form>
        );
    }
});

CreateUserModal.NoThanksBtn = React.createClass({
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

CreateUserModal.ForgotBtn = React.createClass({
    render: function () {
        return (
            <button type='button' className='btn btn-link' onClick={this.props.clickHandler}>Hjælp, jeg har glemt mit password!</button>
        );
    }
});

var FBLoginBtn = React.createClass({
    loginCallback: function (data) {
        if (data.success) {
            this.user.fbAuth()
            .then(function (data) {
                this.props.toggleLoader();
                if (data === this.user.email) {
                    window.location = this.props.loginLocation;
                    return;
                }
                swal({
                    title: 'Ups!',
                    text: 'Der skete en fejl...',
                    type: 'error',
                    confirmButtonColor: '#ACD762'
                });
            }.bind(this));
        } else {
            this.props.toggleLoader();
        }
    },
    fbCallback: function (me) {
        me.userID = this.resp.authResponse.userID;
        if (!me.email) {
            var inputRequest = require('../lib/InputRequest');
            inputRequest.showModal(null, function(email) {
                me.email = email;
                this.user.fbLogin(me)
                .then(this.loginCallback.bind(this));
            });
            return;
        }
        this.user.fbLogin(me)
        .then(this.loginCallback.bind(this));
    },
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
            this.resp = resp;
            if (resp.status === 'connected') {
                this.user = new require('../lib/User')({password: resp.authResponse.accessToken, url: 'http://greenticket.dk'});
                FB.api('/me', this.fbCallback.bind(this));
            } else {
                this.props.toggleLoader();
            }
        }.bind(this), {scope: 'user_birthday,email'});
    },
    render: function () {
        return (
            <button className='cd-button cd-button-fb btn-block' onClick={this.click}>{this.props.text}</button>
        );
    }
});

module.exports = CreateUserModal;
