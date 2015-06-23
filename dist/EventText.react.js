'use strict';
var React = require('react');
module.exports = React.createClass({displayName: "exports",
    render: function () {
        return (
            React.createElement("div", {className: "container"}, 
                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "col-md-6 text-center"}, 
                        React.createElement("h3", null, "'Dit event er klar om 5 minutter!'"), 
                        React.createElement("p", null, React.createElement("small", null, "'Opret din bruger med Facebook, så slipper du for at huske endnu et kodeord' (", React.createElement("strong", null, "'win!'"), ").", React.createElement("br", null), "'Vi slår selvfølgelig aldrig noget op uden din tilladelse.'"))
                    )
                )
            )
        );
    }
});
