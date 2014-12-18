'use strict';

var cp = require('child_process'),
    h = require('../../helpers/helpers.js'),
    db = h.getdb();

describe('register', function(){
    beforeEach(function(done){
        cp.execFile(__dirname+'../../scripts/clean-db.sh', [db], {cwd:__dirname + '../../scripts'}, function(err, stdout, sterr){
            done();
        });
    });
    it('should get register page', function(){
        browser.get('/#/register');
        expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('register');
    });
    it('should register a user', function(){
        element(by.model('user.username')).sendKeys('sam' + h.random(5000));
        element(by.model('user.password')).sendKeys('1234');
        element(by.model('user.avatar')).sendKeys('http://images.apple.com/global/elements/flags/16x16/usa_2x.png');
        element(by.css('button[ng-click]')).click();
        expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('login');
    });
});
