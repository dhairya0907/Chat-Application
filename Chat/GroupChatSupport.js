import firebase from "firebase";
import { alltext } from "../Screens/UserList";

var tmsg = 0;
var score = 0;
var group = 0;
class GroupChatSupport {
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
              .ref("group")
              .once("value", snapshot => {
                group = snapshot.val();
                let dbCon = firebase.database().ref("/total/");
                dbCon.once("value", function(snapshot) {
                  snapshot.forEach(function(child) {
                    child.ref.update({
                      group: group + score
                    });
                  });
                });
                firebase
                  .database()
                  .ref()
                  .update({
                    score: score + group
                  });
                firebase
                  .database()
                  .ref()
                  .update({
                    group: score + group
                  });
              });
          });
      });
  }
  get ref() {
    return firebase.database().ref("messages/general");
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

GroupChatSupport.shared = new GroupChatSupport();
export default GroupChatSupport;
