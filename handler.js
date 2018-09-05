('use strict');
const request = require('request-promise-native');
require('dotenv').load();

module.exports.getWeeklyAffixes = async (event, context) => {
    return request
        .get({
            url: 'https://raider.io/api/v1/mythic-plus/affixes?region=eu',
            json: true
        })
        .then(data => {
            const affixes = data.affix_details.map(element => {
                return element.name;
            });
            const messageContent = `
            Affixes for w/c ${new Date().toDateString()}:
            
            Base: ${affixes[0]}.
            +4: ${affixes[1]}.
            +7: ${affixes[2]}.
            Seasonal: ${affixes[3]}.`;
            return request
                .post({
                    url: `https://api.twilio.com/2010-04-01/Accounts/${
                        process.env.TWILIO_ACCOUNT_SID
                    }/Messages.json`,
                    json: true,
                    auth: {
                        user: process.env.TWILIO_ACCOUNT_SID,
                        pass: process.env.TWILIO_AUTH_TOKEN
                    },
                    form: {
                        From: process.env.SEND_SMS_FROM,
                        To: process.env.SEND_SMS_TO,
                        Body: messageContent
                    }
                })
                .then(data => {
                    return {
                        statusCode: 200,
                        body: JSON.stringify({
                            data: `Sucessfully sent update to ${
                                process.env.SEND_SMS_TO
                            }`
                        })
                    };
                });
        })
        .catch(err => {
            console.log(err);
            return {
                statusCode: 200,
                body: JSON.stringify({
                    err
                })
            };
        });

    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
