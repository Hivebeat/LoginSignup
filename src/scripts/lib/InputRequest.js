/**
*	Made for the Greenticket webapp.
*	This script can present a modal to request for a string from the user
*	and calls a callback function when "ok" is pressed. (Default values are made for email request)
*	Style as you like with css or include modal.css stylesheet
*
*	@depeqdency - jQuery
*	@depndency - EasyModal
*
*	@author - Emil Rasmussen
*  	@company - Greenticket Denmark ApS
**/
var $ = require('jquery');
var GTInputRequest = function (opts) {
    'use strict';
	var options = opts || {};
	var defaults = {
		id: 'email-request-modal',
		header: 'Vi har brug for din email adresse',
		message: 'Vi skal lige være sikre på at vi kan sende dig dine billetter, når du køber dem.',
		inputLabel: 'email',
		buttonID: 'email-modal-ok-btn',
		buttonText: 'OK'
	};
	$.extend(options, defaults);

	var showModal = function (currentEmail, callback) {
		var html = '<div id="'+ options.id +'" class="modal">'+
					'<div class="header">'+ options.header +'</div>'+
				    '<form action="">'+
				        '<div class="txt">'+ options.message +'</div>'+
				        '<div class="txt">'+
				            '<label for="email">'+ options.inputLabel +'</label>'+
				            '<input type="text" name="" id="request-modal-input" placeholder="Indtast din email her..." value="'+(currentEmail || '')+'">'+
				        '</div>'+
				        '<div class="actions">'+
				            '<a class="close signup-btn" id="'+ options.buttonID +'" href="#">'+ options.buttonText +'</a>'+
				        '</div>'+
				    '</form>'+
				'</div>';
		$('body').append(html);
		$('#'+options.id).easyModal().trigger('openModal');
		$('#'+options.buttonID).click(function () {
			var email = $('#request-modal-input').val();
			callback(email);
		});
	};

	return {
		showModal: showModal
	};
};

module.exports = GTInputRequest;
