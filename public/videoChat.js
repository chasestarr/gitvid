$.getJSON('/token', data => {
  videoClient = new Twilio.Video.Client(data.token);

  videoClient.connect({ to: window.location.pathname.slice(1)}).then(joinConvo);

  function joinConvo(convo) {
    // display client's video
    convo.localParticipant.media.attach('#client');

    convo.participants.forEach(peer => {
      peer.media.attach('#peer');
    })
  }
});