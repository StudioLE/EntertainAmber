'use strict';
var Alexa = require('alexa-sdk');
var APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

exports.lang = {
    "en-GB": {
        "translation": {
            "PHRASES": [
                'Amber, sit. I said sit. s. i. t. sit. Stupid dog.',
                'Amber, down.',
                'Amber... Amber... Amber... Amber... Amber... Amber... Amber... Amber... Nothing.',
                'Amber, go away.',
                'Amber, look over here. Here. No, I\'m up here.',
                'Amber, walkies.',
                'Amber, walkies.',
                'Amber, would you like to go for a walk? A long, long walk?',
                'Amber, sausages.',
                'Amber, busy girl.',
                'Amber, who\'s that? Who\'s that? Who\'s that?',
                'Amber, walkies.'
            ],
            "SKILL_NAME" : "Entertain Amber",
            "HELP_MESSAGE" : "You can say entertain Amber, or, you can say exit... What can I help you with?",
            "HELP_REPROMPT" : "What can I help you with?",
            "STOP_MESSAGE" : "Goodbye!"
        }
    }
};

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = exports.lang;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetPhrase');
    },
    'PhraseIntent': function () {
        this.emit('GetPhrase');
    },
    'GetPhrase': function () {
        // Get a random phrase from the phrases list
        // Use this.t() to get corresponding language data
        var phraseArr = this.t('PHRASES');
        var phraseIndex = Math.floor(Math.random() * phraseArr.length);
        var randomPhrase = phraseArr[phraseIndex];

        // Create speech output
        var speechOutput = randomPhrase;
        this.emit(':tellWithCard', speechOutput, this.t("SKILL_NAME"), randomPhrase)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = this.t("HELP_MESSAGE");
        var reprompt = this.t("HELP_MESSAGE");
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    }
};