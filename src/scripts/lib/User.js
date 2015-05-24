'use strict';
var $ = require('jquery');
var User = function(options) {
    options = options || {};
    this.email = options.email || '';
    this.rememberMe = options.rememberme || 'OFF';
    var password = options.password || '';
    var URL = options.url;
    this.create = function() {
        return $.post(URL + '/api/users/createNew', {
            user: {
                email: this.email,
                password: password,
                repeat: password
            }
        });
    };

    this.authenticate = function() {
        return $.post(URL + '/Actions/startSession.php', {
            email: this.email,
            password: password,
            rememberMe: this.rememberMe
        });
    };

    this.fbAuth = function() {
        return $.post(URL + '/Actions/startSession.php', {
            email: this.email,
            password: password,
            rememberMe: true,
            fb: true
        });
    };

    this.fbLogin = function(me) {
        this.email = me.email;
        var data = {
            email: me.email,
            firstname: me.first_name,
            lastname: me.last_name,
            locale: me.locale,
            birthday: me.birthday,
            sex: me.gender,
            fbID: me.userID
        };
        return $.post(URL + '/api/login/facebook', data);
    };

    this.sendForgotMail = function() {
        return $.post(URL + '/api/users/' + this.email + '/forgot');
    };
};


module.exports = User;
