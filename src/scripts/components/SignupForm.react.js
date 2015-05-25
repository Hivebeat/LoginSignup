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
                    <input className='full-width has-padding has-border' id='create-email' name='email' type='email' placeholder='Email' required data-error='Din email er ikke en rigtig email adresse...' ref='email'/>
                    <span className='cd-error-message help-block with-errors hidden'></span>
                </p>
                <p className='fieldset form-group'>
                    <label className='image-replace cd-password' htmlFor='signin-password'><i className='fa fa-lock'></i></label>
                    <input className='full-width has-padding has-border' id='create-password' name='password' type='password' placeholder='Password' required data-minlength='6' data-error='Password skal være minimum 6 karatérer...' ref='password'/>
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
