'use strict';

var cp   = require('child_process'),
    h    = require('../../helpers/helpers.js'),
    path = require('path'),
    db   = h.getdb();

describe('notes list', function(){
    beforeEach(function(done){
        cp.execFile(__dirname+'../../scripts/clean-db.sh', [db], {cwd:__dirname + '../../scripts'}, function(err, stdout, sterr){
            login();
            done();
        });
    });
    it('should get the notes page', function(){
        expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('notes');
    });
    it('should create a note', function(){
        create('a', 'b', 'c,d,e');
        expect(element(by.model('note.title')).getText()).toEqual('');
        expect(element(by.model('note.tags')).getText()).toEqual('');
        expect(element(by.model('note.body')).getText()).toEqual('');

        expect(element.all(by.repeater('note in notes')).count()).toBeGreaterThan(0);
    });
    it('should show a note detail', function(){
        create('x', 'y', 'z1,z2,z3');
        element(by.repeater('note in notes').row(0)).element(by.css('td:nth-child(2) > a')).click();
        expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('x');
    });
});

function login(){
    browser.get('/#/login');
    element(by.model('user.username')).sendKeys('bob');
    element(by.model('user.password')).sendKeys('1234');
    element(by.css('button[ng-click]')).click();
    browser.get('/#/notes');
}

function create(){
    var image = path.resolve(__dirname, '../../fixtures/flag.png');
    element(by.model('note.title')).sendKeys('a');
    element(by.model('note.tags')).sendKeys('bb');
    element(by.model('note.body')).sendKeys('c,d,e');
    element(by.css('input[type="file"]')).sendKeys(image);
    element(by.css('button[ng-click]')).click();
}
