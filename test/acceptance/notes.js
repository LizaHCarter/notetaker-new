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

describe('Notes', function(){
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
            done();
        });
    });
  });
 describe('post /notes', function(){
    it('should create a new note', function(done){
        var options = {
            method: 'post',
            url: '/notes',
            headers:{
                cookie:cookie
            },
            payload: {
                title: 'title',
                body: 'body',
                tags: 'tag1, tag2'
            }
        };
        server.inject(options, function(response){
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
  });
  describe('get /notes', function(){
    it('should get notes for a user', function(done){
        var options = {
            method: 'get',
            url: '/notes',
            headers:{
                cookie:cookie
            }
        };
        server.inject(options, function(response){
            expect(response.statusCode).to.equal(200);
            console.log(response);
            done();
        });
    });
  });
  describe('get /notes/1', function(){
    it('should get a specific note', function(done){
        var options = {
            method: 'get',
            url: '/notes/1',
            headers:{
                cookie:cookie
            }
        };
        server.inject(options, function(response){
            expect(response.statusCode).to.equal(200);
            console.log(response.results);
            done();
        });
    });
  });
});
