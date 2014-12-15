/* jshint expr:true */

'use strict';

var expect    = require('chai').expect,
    cp        = require('child_process'),
    h         = require('../helpers/helpers.js'),
    User      = require('../../server/models/user'),
    Lab       = require('lab'),
    lab       = exports.lab = Lab.script(),
    describe  = lab.describe,
    it        = lab.it,
    //before    = lab.before,
    beforeEach = lab.beforeEach,
    db          = h.getdb();

describe('User', function(){
  beforeEach(function(done){
    cp.execFile(__dirname+'/../scripts/clean-db.sh', [db], {cwd:__dirname+'/../scripts'}, function(){
        done();
    });
  });
  describe('constructor', function(){
    it('should create a user object', function(done){
        var user = new User({username:'bob'});
        expect(user).to.be.instanceof(User);
        expect(user.username).to.equal('bob');
        done();
    });
  });
 describe('.register', function(){
    it('should register a new user', function(done){
        User.register({username:'jill', password:'1234', avatar:'http://images.apple.com/global/elements/flags/16x16/usa_2x.png'}, function(err){
            expect(err).to.be.null;
            done();
        });
    });
    it('should not register a new user - duplicate', function(done){
        User.register({username:'bob', password:'1234', avatar:'http://images.apple.com/global/elements/flags/16x16/usa_2x.png'}, function(err){
            expect(err).to.be.ok;
            done();
        });
    });
  });
  describe('.login', function(){
    it('should log in a user', function(done){
        User.login({username:'bob', password:'1234'}, function(user){
            expect(user).to.be.ok;
            expect(user.username).to.equal('bob');
            done();
        });
    });
    it('should not log in a user - bad username', function(done){
        User.login({username:'bob1', password:'1234'}, function(user){
            expect(user).to.be.undefined;
            done();
        });
    });
    it('should not log in a user - bad password', function(done){
        User.login({username:'bob', password:'1235'}, function(user){
            expect(user).to.be.undefined;
            done();
        });
    });
  });
});
