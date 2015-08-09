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

var NoThanksBtn = React.createClass({
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
        fblogin: React.PropTypes.func.isRequired
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
        if( Object.prototype.toString.call(this.props.triggerId) === '[object Array]' ) {  
          for(var i = 0; i < this.props.triggerId.length; i++) {
            var triggerId = this.props.triggerId[i];
            $('#'+triggerId).click(function () {
                this.setState({
                    isVisible: true
                });
            }.bind(this));
          }
        } else {
          $('#'+this.props.triggerId).click(function () {
              this.setState({
                  isVisible: true
              });
          }.bind(this));
        }
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
            create: <SignupForm
                        __={__}
                        submit={this.props.signup}
                        visible={this.state.formVisible}
                        toggleLoader={this.toggleLoader}/>,
            login: <LoginForm
                        __={__}
                        submit={this.props.login}
                        visible={this.state.formVisible}
                        toggleLoader={this.toggleLoader}
                        forgotHandler={this.showForgot}/>,
            forgot: <ForgotForm
                        __={__}
                        submit={this.props.forgot}
                        toggleLoader={this.toggleLoader}/>
        },
        noThanksBtns = {
            create: <NoThanksBtn
                        noThx={__('No thanks')}
                        text={__('I do not want to signup using Facebook')}
                        handleClick={this.showForm}
                        visible={!this.state.formVisible}/>,
            login: <NoThanksBtn
                        noThx={__('No thanks')}
                        text={__('I do not want to login using Facebook')}
                        handleClick={this.showForm}
                        visible={!this.state.formVisible}/>
            },
        fbLoginBtns = {
            create: <FBLoginBtn
                        scope={this.props.fbloginscope}
                        callback={this.props.fblogin}
                        text={__('Signup using Facebook')}
                        toggleLoader={this.toggleLoader}/>,
            login: <FBLoginBtn
                        scope={this.props.fbloginscope}
                        callback={this.props.fblogin}
                        text={__('Login using Facebook')}
                        toggleLoader={this.toggleLoader}/>
        };
        var eventText = (this.state.form === 'create' && this.props.createEvent) ? <EventText /> : '';
        return (
            <div id='gt-create-user-modal' className={'cd-user-modal ' + (this.state.isVisible ? 'is-visible' : '')} onClick={this.clicked}>
                <div className='cd-user-modal-container'>
                    <LoginSwitcher
                        loginTxt={__('Login')}
                        signupTxt={__('Signup')}
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
