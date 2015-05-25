'use strict';
var React = require('react'),
    FormMixin = require('./mixins/FormMixin');
module.exports = React.createClass({
    mixins: [FormMixin],
    render: function () {
        return(
            <div>
                <div className='container'>
                  <div className='row'>
                    <div className='col-md-6 text-center'>
                      <h3>{this.props.__('No worries!')}</h3>
                      <p><small>{this.props.__('Write your email under here and we\'ll shoot you an email')}</small></p>
                    </div>
                  </div>
                </div>
                <form id="forgot-form" className='cd-form' ref='form' onSubmit={this.submit}>
                    <p className='fieldset form-group'>
                        <label className='image-replace cd-email' htmlFor='forgot-email'><i className='fa fa-envelope-o'></i></label>
                        <input className='full-width has-padding has-border' id='forgot-email' name='email' type='email' placeholder={this.props.__('Email')} required data-error={this.props.__('Your email is not valid...')} ref='email'/>
                        <span className='cd-error-message help-block with-errors hidden'></span>
                    </p>
                    <p className='fieldset form-group'>
                        <input className='full-width' type='submit' value={this.props.__('Send me an email!')}/>
                    </p>
                </form>
            </div>
        );
    }
});
