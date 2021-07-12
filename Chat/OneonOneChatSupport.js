import firebase from "firebase";
import { alltext } from "../Screens/UserList";

var chatwith;
var tmsg;
var score;
class OneonOneChatSupport {
  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  update() {
    const currentUser = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("users/" + currentUser + "/fname")
      .on("value", snapshot => {
        name = snapshot.val();
        firebase
          .database()
          .ref("score")
          .once("value", snapshot => {
            score = snapshot.val();

            firebase
              .database()
              .ref("total/" + name + "/" + alltext)
              .once("value", snapshot => {
                if (snapshot.child(name + "/" + alltext).exists()) {
                  tmsg = snapshot.val();
                } else {
                  tmsg = score;
                }

                firebase
                  .database()
                  .ref("total/" + name)
                  .update({
                    [alltext]: tmsg + score
                  });
              });
            firebase
              .database()
              .ref("total/" + alltext + "/" + name)
              .once("value", snapshot => {
                if (snapshot.child(alltext + "/" + name).exists()) {
                  tmsg = snapshot.val();
                } else {
                  tmsg = score;
                }

                firebase
                  .database()
                  .ref("total/" + alltext)
                  .update({
                    [name]: tmsg + score
                  });
              });
            firebase
              .database()
              .ref()
              .update({
                score: score + tmsg
              });
          });
      });
  }

  get ref() {
    const currentUser = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("users/" + currentUser + "/chat/" + alltext)
      .once("value", snapshot => {
        chatwith = snapshot.val().shared_id;
      });
    return firebase.database().ref("messages/oneonone/" + chatwith);
  }

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      timestamp,
      text,
      user
    };
    return message;
  };

  on = callback =>
    this.ref
      .limitToLast(20)
      .on("child_added", snapshot => callback(this.parse(snapshot)));

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp
      };
      this.append(message);
    }
    this.update();
  };

  append = message => this.ref.push(message);

  off() {
    this.ref.off();
  }
}

OneonOneChatSupport.shared = new OneonOneChatSupport();
export default OneonOneChatSupport;
