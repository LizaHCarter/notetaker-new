/* jshint expr:true */

'use strict';

var expect    = require('chai').expect,
    cp        = require('child_process'),
    h         = require('../helpers/helpers.js'),
    server    = require('../../server/index'),
    Lab       = require('lab'),
    lab       = exports.lab = Lab.script(),
    describe  = lab.describe,
    it        = lab.it,
    //before    = lab.before,
    beforeEach = lab.beforeEach,
    db          = h.getdb();

describe('Users', function(){
  var cookie;
  beforeEach(function(done){
    cp.execFile(__dirname+'/../scripts/clean-db.sh', [db], {cwd:__dirname+'/../scripts'}, function(){
        var options = {
            method: 'post',
            url: '/login',
            payload: {
                username: 'bob',
                password: '1234'
            }
        };
        server.inject(options, function(response){
            cookie = response.headers['set-cookie'][0].match(/hapi-cookie=[^;]+/)[0];
            console.log(cookie);
            done();
        });
    });
  });
 describe('post /register', function(){
    it('should register a new user', function(done){
        var options = {
            method: 'post',
            url: '/register',
            payload: {
                username: 'sally',
                password: '1234',
                avatar: 'http://icons.iconarchive.com/icons/hopstarter/superhero-avatar/256/Avengers-Captain-America-icon.png'
            }
        };
        server.inject(options, function(response){
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
    /*it('should not register a new user - duplicate', function(done){
            done();
        });
    });*/
  });
  describe('post /login', function(){
    it('should log in a user', function(done){
        var options = {
            method: 'post',
            url: '/login',
            payload: {
                username: 'bob',
                password: '1234'
            }
        };
        server.inject(options, function(response){
            expect(response.statusCode).to.equal(200);
            expect(response.result.username).to.equal('bob');
            console.log(response);
            done();
        });
    });
  });
    /*it('should not log in a user - bad username', function(done){
            done();
    });*/
  describe('delete /logout', function(){
    it('should logout a user', function(done){
        var options = {
            method: 'delete',
            url: '/logout',
            headers: {
                cookie:cookie
            }
        };
        server.inject(options, function(response){
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
  });
  describe('get /status', function(){
    it('should logout a user', function(done){
        var options = {
            method: 'get',
            url: '/status',
            headers: {
                cookie:cookie
            }
        };
        server.inject(options, function(response){
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
  });
});
