'use strict';

var util = require('util');

var EventEmitter = require('events');


module.exports = Timer;

function Timer (){
	EventEmitter.call(this);
	var self = this;
	this.i = 0;
	setInterval(function (){
		self.emit('tick', { interval : self.i++});
	}, 1000);
}
util.inherits(Timer, EventEmitter);

function tickHandler(event){
	process.stdout.write('tick', + this.i + '\n');
	if(this.i == 60){
		this.removeListener('tick', tickHandler);
	}
}
var myTimer = new Timer();

myTimer.addListener('tick', tickHandler);
