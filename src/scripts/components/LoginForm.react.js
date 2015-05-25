'use strict';
var React = require('react'),
    FormMixin = require('./mixins/FormMixin'),

    ForgotBtn = React.createClass({
        render: function () {
            return (
                <button type='button' className='btn btn-link' onClick={this.props.clickHandler}>Hjælp, jeg har glemt mit password!</button>
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
                    <input className='full-width has-padding has-border' id='signin-email' name='email' type='email' placeholder='Email' required data-error='Din email er ikke en rigtig email adresse...' ref='email'/>
                    <span className='cd-error-message help-block with-errors hidden'></span>
                </p>
                <p className='fieldset form-group'>
                    <label className='image-replace cd-password' htmlFor='signin-password'><i className='fa fa-lock'></i></label>
                    <input className='full-width has-padding has-border' id='signin-password' name='password' type='password' placeholder='Password' required data-error='Du skal indtaste et password...' ref='password'/>
                    <span className='cd-error-message help-block with-errors hidden'></span>
                </p>
                <p className='text-center fieldset'>
                    <input type='checkbox' id='remember-me' name='rememberme' ref='rememberme'/>
                    <label htmlFor='remember-me'>&nbsp; Husk mig</label>
                </p>
                <p className='fieldset form-group'>
                    <input className='full-width' type='submit' value='Login'/>
                </p>
                <p className='text-center'>
                  <ForgotBtn clickHandler={this.props.forgotHandler}/>
                </p>
            </form>
        );
    }
});
