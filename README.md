# WoW Weekly Affixes Lambda

### What it does:

This will only make sense if you play World of Warcraft, so if it just seems like jargon then don't worry about it.\
This will check the weekly M+ affixes from raider.io for the EU region, and text them to your phone.

You're free to use this, just bear in mind you'll need a Twilio account to make use of it.\
Remember to set the environment variables or this won't work.

Both of these can be got from your Twilio dashboard:
- TWILIO_ACCOUNT_SID = Your Account SID
- TWILIO_AUTH_TOKEN = Your Auth Token. This is hidden by default so just click 'view'

The actual texting. Note: both numbers must be complete including the country code (this can be found on your Twilio dashboard too):
- SEND_SMS_FROM = The phone number you've purchased on Twilio
- SEND_SMS_TO = Your number

You can then schedule it through your Amazon account:
- Go to your [Amazon Cloudwatch Dashboard](https://console.aws.amazon.com/cloudwatch/home)
- Under **Events** on the left click **Rules**
- Change the radio button from **Event Pattern** to **Schedule** and pick your schedule
    - I would recommend using the *cron* functionality with the param - **0 7 ? * WED \*** - to give the api time after server restart to update
    - Please remember that cron uses GMT
- Click **Add Target** and select **Lambda Function** from the dropdown
- Select your function, hit **Configure Details** and give your rule a name and description
- Hit **Create Rule** and you're good to go