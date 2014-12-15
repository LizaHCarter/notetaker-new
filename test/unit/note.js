/* jshint expr:true, camelcase: false*/

'use strict';

var expect    = require('chai').expect,
    cp        = require('child_process'),
    h         = require('../helpers/helpers.js'),
    Note      = require('../../server/models/note'),
    Lab       = require('lab'),
    lab       = exports.lab = Lab.script(),
    describe  = lab.describe,
    it        = lab.it,
    //before    = lab.before,
    beforeEach = lab.beforeEach,
    fs         = require('fs'),
    db          = h.getdb();

describe('Note', function(){
  var noteId;
  beforeEach(function(done){
    cp.execFile(__dirname+'/../scripts/clean-db.sh', [db], {cwd:__dirname+'/../scripts'}, function(){
        Note.create({id:1}, {title:'a', body:'b', tags:'c,d,e'}, function(err, results){
          noteId = results;
          done();
        });
    });
  });
  describe('constructor', function(){
    it('should create a note object', function(done){
        var note = new Note();
        expect(note).to.be.instanceof(Note);
        done();
    });
  });
  describe('.create', function(){
    it('should create a new note', function(done){
        Note.create({id: 1},{title:'a', body:'bb', tags:'c, d, e'}, function(err, results){
            expect(err).to.be.null;
            expect(results).to.be.ok;
            done();
        });
    });
  });
  describe('.query', function(){
    it('should query the notes table', function(done){
        Note.query({id:1}, {}, function(err, results){
            expect(err).to.be.null;
            expect(results).to.have.length(1);
            done();
        });
    });
  });
  describe('.show', function(){
    it('should show a note', function(done){
      Note.show({id:1}, noteId, function(err, note){
        console.log(err);
        console.log(note);
        done();
      });
    });
   });
   describe('.count', function(){
      it('should count notes', function(done){
        Note.count({id:1}, function(err, results){
            expect(err).to.be.null;
            expect(results).to.equal('1');
            done();
        });
      });
   });
    describe('.nuke', function(){
      it('should delete a note', function(done){
        Note.nuke({id:1}, noteId, function(err, results){
            expect(err).to.be.null;
            expect(results).to.be.ok;
            done();
        });
      });
   });
    describe('.uploadmobile', function(){
      it('should upload a b64 image', function(done){
        Note.uploadmobile({token:'tok'}, 'b64image', noteId, function(err, results){
            expect(err).to.be.null;
            done();
        });
      });
   });
   describe('.upload', function(){
      it('should upload an image', function(done){
        var file = fs.createReadStream(__dirname+'/../fixtures/flag.png')
        Note.upload({token:'tok'}, file, 'flag.png', noteId, function(err, results){
            expect(err).to.be.null;
            done();
        });
      });
   });
});
