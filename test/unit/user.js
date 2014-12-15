/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    User      = require('../../server/models/user'),
    Lab       = require('lab'),
    lab       = exports.lab = Lab.script(),
    describe  = lab.describe,
    it        = lab.it, 
    before    = lab.before,
    beforeEach = lab.beforeEach;

describe('User', function(){
 /* before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });*/

  describe('constructor', function(){
    it('should create a user object', function(done){
        var user = new User({username:'bob'});
        
        expect(user).to.be.instanceof(User);
        expect(user.username).to.equal('bob');
        done();
    });
  });

});
