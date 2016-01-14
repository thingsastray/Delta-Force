'use strict';

var util = require('util');

var EventEmitter = require('events');


module.exports = Timer;

function Timer (setTime, devTime){
	EventEmitter.call(this);
	var self = this;
	this.i = 0;
	
	this.setTime = setTime || 10;
	
	this.devTime = devTime || 50;

	var millyStart = Date.now();
	var millyStop = Date.now();


	this.start = function (){
		this.millyStart = Date.now();
		this.startTime =	setInterval(function (){
			self.emit('tick', { interval : self.i++});
		}, 1000);
		self.emit('start');
		
	};

	this.stop = function (){
		this.millyStop = Date.now();
		self.emit('stop');
	};

}

util.inherits(Timer, EventEmitter);
function startHandler(event){

}

function stopHandler(event){
	clearInterval(this.startTime);
	this.emit('complete', { Complete : (this.millyStop - this.millyStart)});
}

function completeHandler(event){
	console.log(event.Complete);
}

function lagHandler(event){
	console.log('lag', event.devation);
}

function tickHandler(event){
	var millyCurrent = Date.now();
	var devation = (this.millyCurrent - this.millyStart) - (this.i * 1000);

	console.log('tick', + this.i);
	if(this.i == this.setTime){
		myTimer.stop();
	}
	
	if (devation > this.devTime || devation < -this.devTime){
		this.emit('lag', {"devation" : devation});
	}
}

var myTimer = new Timer(10, 40);

myTimer.on('tick', tickHandler);
myTimer.on('start', startHandler);
myTimer.on('stop', stopHandler);
myTimer.on('complete', completeHandler);
myTimer.on('lag', lagHandler);

myTimer.start();
// setTimeout(function(){
// 	myTimer.stop();
// }, 5000);

