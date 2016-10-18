# GitVid #

Video chat for GitHub issues. Quickly start a new p2p conversation with the `!gitvid` command. [Install it for yourself](https://github.com/integration/gitvid).

---

### Getting Started

- Clone the repo and `npm install`
- To get a quick dev server running, comment out the https section of server.js (last 8 lines).
  - `node server.js`
  - `ngrok http 7001`
- Register a new GitHub integration [here](https://github.com/settings/integrations).
  - Add '<https ngrok url>/comment' in the Webhook URL field.
  - Create a new 'private key' and update the KEY_PATH in config.js
  - Change INTEGRATION_ID in config.js to the 'ID' number at the top of the GitHub integration page
  - Change BASE_URL in config.js to ngrok url
- Register for Twilio's programmable video API
  - Create a new file called 'twilioConfig.js' and include the below information:
  - ```javascript
    module.exports = {
      TWILIO_ACCOUNT_SID: <ACCNT_SID>,
      TWILIO_API_KEY: <API_KEY>,
      TWILIO_API_SECRET: <API_SECRET>,
      TWILIO_CONFIGURATION_SID: <CONFIG_SID>
    };
    ```
### How you can help
- Twilio's video API kind of sucks, but does have peer discovery built in. One of the first priorities is to move to either a custom system or less restrictive.
- Offering audio-only chat would be useful for multiple connections at once. The system tends to slow down after 3 or more peers.
- The front-end could use a spring cleaning ;)
- Add unit tests

#### Ping me on Twitter [@captivechains](https://twitter.com/captivechains) or here if you have questions.