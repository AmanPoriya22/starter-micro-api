const functions = require('firebase-functions');
const agora = require('agora-access-token');

exports.generateToken = functions.https.onCall(async (data, context) => {
  const appId = 'f8001179bb744831b3f0099a81e5b0cb';
  const appCertificate = '649815119f6b43f9851acaaa7fe7f23e';
  const uid = data.uid; // The unique identifier of the user requesting the token
  const role = agora.RtcRole.PUBLISHER; // The role of the user requesting the token
  const expirationTimeInSeconds = 3600; // The expiration time of the token in seconds

  const channelName = generateChannelName(); // Generate a unique channel name

  const token = agora.generateToken(appId, appCertificate, channelName, uid, role, expirationTimeInSeconds);

  return {"token": token, "channelName": channelName};
});

function generateChannelName() {
  // Generate a random channel name using a timestamp
  return 'channel-' + Date.now().toString();
}
