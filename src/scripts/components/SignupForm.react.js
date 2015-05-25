'use strict';
var React = require('react'),
    FormMixin = require('./mixins/FormMixin');
module.exports = React.createClass({
    mixins: [FormMixin],

    render: function () {
        return(
            <form id='create-user-form' className={'cd-form' + (this.props.visible ? '' : ' hidden')} onSubmit={this.submit} ref='form'>
                <p className='fieldset form-group'>
                    <label className='image-replace cd-email' htmlFor='signin-email'><i className='fa fa-envelope-o'></i></label>
                    <input className='full-width has-padding has-border' id='create-email' name='email' type='email' placeholder={this.props.__('Email')} required data-error={this.props.__('Your email is not valid...')} ref='email'/>
                    <span className='cd-error-message help-block with-errors hidden'></span>
                </p>
                <p className='fieldset form-group'>
                    <label className='image-replace cd-password' htmlFor='signin-password'><i className='fa fa-lock'></i></label>
                    <input className='full-width has-padding has-border' id='create-password' name='password' type='password' placeholder={this.props.__('Password')} required data-minlength='6' data-error={this.props.__('Password must be at least 6 characters')} ref='password'/>
                    <span className='cd-error-message help-block with-errors hidden'></span>
                </p>
                <p className='fieldset form-group'>
                    <label className='image-replace cd-password' htmlFor='signin-password'><i className='fa fa-lock'></i></label>
                    <input className='full-width has-padding has-border' id='repeat-password' name='repeat' type='password' placeholder={this.props.__('Repeat Password')} required data-match='#create-password' data-match-error={this.props.__('Password does not match previous...')} data-error={this.props.__('Please repeat your password...')} />
                    <span className='cd-error-message help-block with-errors hidden'></span>
                </p>
                <p className='text-center fieldset'>
                    <input type='checkbox' id='remember-me' name='rememberme' ref='rememberme'/>
                    <label htmlFor='remember-me'>&nbsp; {this.props.__('Remember me')}</label>
                </p>
                <p className='fieldset form-group'>
                    <input className='full-width' type='submit' value={this.props.__('Signup')} />
                </p>
            </form>
        );
    }
});
