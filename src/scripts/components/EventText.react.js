'use strict';
var React = require('react');
module.exports = React.createClass({
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
