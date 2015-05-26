'use strict';
var React = require('react'),
    FormMixin = require('./mixins/FormMixin'),

    ForgotBtn = React.createClass({
        render: function () {
            return (
                <button type='button' className='btn btn-link' onClick={this.props.clickHandler}>{this.props.__('Help! I forgot my password!')}</button>
            );
        }
    });

module.exports = React.createClass({
    mixins: [FormMixin],

    render: function () {
        return (
            <form id='login-form' className={'cd-form' + (this.props.visible ? '' : ' hidden')} onSubmit={this.submit} ref='form'>
                <p className='fieldset form-group'>
                    <label className='image-replace cd-email' htmlFor='signin-email'><i className='fa fa-envelope-o'></i></label>
                    <input className='full-width has-padding has-border' id='signin-email' name='email' type='email' placeholder={this.props.__('Email')} required data-error={this.props.__('Your email is not valid...')} ref='email'/>
                    <span className='cd-error-message help-block with-errors hidden'></span>
                </p>
                <p className='fieldset form-group'>
                    <label className='image-replace cd-password' htmlFor='signin-password'><i className='fa fa-lock'></i></label>
                    <input className='full-width has-padding has-border' id='signin-password' name='password' type='password' placeholder={this.props.__('Password')} required data-error={this.props.__('Please input a password..')} ref='password'/>
                    <span className='cd-error-message help-block with-errors hidden'></span>
                </p>
                <p className='text-center fieldset'>
                    <input type='checkbox' id='remember-me' name='rememberme' ref='rememberme'/>
                    <label htmlFor='remember-me'>&nbsp; {this.props.__('Remember me')}</label>
                </p>
                <p className='fieldset form-group text-center'>
                    <input className='full-width' type='submit' value={this.props.__('Login')}/>
                </p>
                <p className='text-center'>
                  <ForgotBtn clickHandler={this.props.forgotHandler} __={this.props.__}/>
                </p>
            </form>
        );
    }
});
