'use strict';

var APP_ID = 'amzn1.ask.skill.ca9dd4e3-2e3c-4371-b8f4-9ad77d6616c5';
var AlexaSkill = require('./AlexaSkill');
var SPEECH_OUTPUT = ' I am delighted to meet you. How do you do? My name is Gentleman and my purpose is to greet you with politeness.';

// function that inherits from AlexaSkill class
var GentlemanService = function() {
  AlexaSkill.call(this, APP_ID);
};
GentlemanService.prototype = Object.create(AlexaSkill.prototype);

// event handler function that will be invoked when the user first launches the skill with it's invocation name.
// helloResponseFunction function will build a response to the Alexa skill interface that
// tells Alexa how to respond to the user's request.
// Ex. the onLaunch event is triggered if the skill is invoked with the phrase "Alexa, open Gentleman" or "Alexa, start Gentleman".
var helloResponseFunction = function(intent, session, response) {
  var date = new Date();
    if (date.getHours() >= 0 && date.getHours() <= 12) {
        response.tell('Good Morning!' + SPEECH_OUTPUT);
    } else if (date.getHours() >= 12 && date.getHours() <= 17) {
        response.tell('Good Afternoon!' + SPEECH_OUTPUT);
    } else if (date.getHours() >= 17 && date.getHours() <= 0) {
        response.tell('Good Night!' + SPEECH_OUTPUT);
    } else {
        console.log('Current local time: ' + date.getHours());
    }

};
GentlemanService.prototype.eventHandlers.onLaunch = helloResponseFunction;

// a user's request is resolved to the handler by providing the skill interface a list of "utterances"
// in this example the onLaunch and the intent handlers perform the same action - say hello.
GentlemanService.prototype.intentHandlers = {
  'GreetIntent': helloResponseFunction
};

// This definition will allow the skill service you have written to run on the AWS Lambda platform correctly.
// AWS Lambda will be able to route the event and context information sent from the skill interface to your skill service as JSON data.
// The JSON payload includes session, environment, information about the request from the Alexa account from which the skill was invoked.
exports.handler = function(event, context) {
  var gentlemanService = new GentlemanService();
  gentlemanService.execute(event, context);
};
