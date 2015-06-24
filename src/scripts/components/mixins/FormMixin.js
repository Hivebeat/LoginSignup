'use strict';
var $ = require('jquery');
module.exports = {
    componentDidMount: function() {
        this.$form = $('#' + this.refs.form.getDOMNode().id);
        if (typeof this.$form.validator !== 'undefined') {
          this.$form.validator();
        }
        $(document).on('valid.bs.validator', function(e) {
            var helpBlock = $(e.relatedTarget).next();
            if (helpBlock.hasClass('help-block')) {
                helpBlock.addClass('hidden');
            }
        });
    },

    submit: function(e) {
        e.preventDefault();
        var valid = true;
        var data = {};
        if (typeof this.$form.validator !== 'undefined') {
          this.$form.validator('validate');
        }
        this.$form.find('.help-block').each(function(index, element) {
            var $element = $(element);
            if ($element.children().length > 0) {
                valid = false;
                $element.removeClass('hidden');
            }
        });
        for (var key in this.refs) {
            if (this.refs.hasOwnProperty(key)) {
                var ref = this.refs[key].getDOMNode();
                if (ref.tagName === 'INPUT') {
                    if (ref.type === 'checkbox') {
                        data[key] = $(ref).is(':checked');
                    } else {
                        data[key] = $(ref).val();
                    }
                }
            }
        }
        data.valid = valid;
        this.props.submit(data);
    }
};
