export default {
  credentials: {
    username: '',
    isLogged: false
  },
  newCallModal: false,
  incomingCallModal: false,
  contacts: [],
  calls: [],
  activeCall: {},
  tasks: [],
  activeTask: {},
  notes: [],
  activeNote: {},
  selfinfo: {},
  sounds: {
    ringing: new Audio('./static/sounds/ringing.mp3')
  },
  firstState: '',
  incomingCall: {},
  devices: [],
  callHistory: [],
  callOptions: {
    isAudioEnabled: true,
    isVideoEnabled: true,
    sendInitialVideo: false,
    sendScreenShare: false,
    videoResolution: { height: 200, width: 200 },
    localVideoContainer: null,
    remoteVideoContainer: null
  },
  conversations: [],
  sessions: [],
  dialValue: ''
}
