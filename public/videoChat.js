const Video = Twilio.Video;

window.addEventListener('beforeunload', leaveRoomIfJoined);

$.getJSON('/token', data => {
  let videoClient = new Video.Client(data.token);

  const path = window.location.pathname.slice(1);

  function joinConvo(convo) {
    convo.localParticipant.media.attach('#peer');

    convo.participants.forEach(peer => {
      peer.media.attach('#peer');
    });

    convo.on('participantConnected', peer => {
      peer.media.attach('#peer');
    });

    convo.on('participantDisconnected', participant => {
      participant.media.detach();
    });
  }

  const localMedia = new Video.LocalMedia();

  Video.getUserMedia().then(mediaStream => {
    localMedia.addStream(mediaStream);
  });

  videoClient.connect({ to: path, localMedia: localMedia })
    .then(joinConvo)
    .catch(err => console.log('err:', err));
});

function leaveRoomIfJoined() {
  if (activeRoom) {
    activeRoom.disconnect();
  }
}
