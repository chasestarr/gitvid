const integration = require('./integration');
console.log('this is the integration file');
let queue = [];

function followUp(username, commentUrl, token) {
  console.log('following up');
  queue.push({
    username: username,
    commentUrl: commentUrl,
    token: token,
    time: Math.round(Date.now() / 1000)
  });

  console.log('this is the queue', queue);
}

function _loop() {
  console.log('looping');
  const now = Math.round(Date.now() / 1000);
  const TEN_MINUTES = 60 * 1; // <----- testing one minute for now
  let job = queue[0];
  if (job) {
    console.log(now - job.time);
    if (now - job.time >= TEN_MINUTES) {
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
      queue.shift();
    }
  }
}

setInterval(_loop, 1000 * 70);
_loop();

module.exports = {
  followUp: followUp
};