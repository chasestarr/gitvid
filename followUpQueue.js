const integration = require('./integration');
let queue = [];

function followUp(username, commentUrl, token) {
  queue.push({
    username: username,
    commentUrl: commentUrl,
    token: token,
    time: Math.round(Date.now() / 1000)
  });
}

function _loop() {
  const now = Math.round(Date.now() / 1000);
  const TEN_MINUTES = 1000 * 60 * 1; // <----- testing one minute for now
  let job = queue[0];
  if (job) {
    if (now - job.time <= TEN_MINUTES) {

      const options = {
        url: job.commentUrl,
        json: {
          body: `Hey @${job.username}, how was the discussion? Please summarize in a comment below. :memo:`,
        },
        headers: {
            'User-Agent': 'GitVid',
            'Accept': 'application/json',
            'Authorization': `Bearer ${(job.token)}`
        },
      };

      integration.commentOnIssue(options);
    }
  }
}

setInterval(_loop, 1000 * 70);

module.exports = {
  followUp: followUp
};