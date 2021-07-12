import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Card } from "react-native-paper";
import firebase from "firebase";

const windowHeight = Dimensions.get("window").height;
var name = "";
var alltext = "";
var flag = 0;
var key;
export default class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: [],
      allname: [],
      exname: [],
      or: [],
      unfname: [],
      isDataLoaded: false,
    };
  }
  componentDidMount() {
    const currentUser = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("users/" + currentUser + "/fname")
      .on("value", (snapshot) => {
        name = snapshot.val();
        this.list();
      });
  }
  list() {
   firebase
      .database()
      .ref("total")
      .once("value", (snapshot) => {
        if (snapshot.child(name).exists()) {
          const ref = firebase.database().ref("total/" + name);
          ref.orderByValue().on("value", (snapshot) => {
            this.state.fname = [];
            snapshot.forEach((item) => {
              this.state.fname.push({
                fname: item.key,
              });
              this.setState(this.state);
            });
          });
          this.or();
        } else {
          this.extra();
          this.setState(this.state);
        }
      });
  }
  or() {
    const reff = firebase.database().ref("users");
    reff.orderByChild("fname").on("value", (snapshot) => {
      this.state.or = [];
      snapshot.forEach((item) => {
        this.state.or.push({
          fname: item.val().fname,
        });
      });
    });
    this.all();
    this.setState(this.state);
  }
  all() {
    firebase
      .database()
      .ref("total")
      .once("value", (snapshot) => {
        this.state.allname = [];
        this.state.or.map((item) => {
          if (
            snapshot.child(name + "/" + item.fname).exists() == false &&
            name != item.fname
          ) {
            this.state.allname.push({
              fname: item.fname,
            });
            this.setState(this.state);
          }
        });
      });
  }
  extra() {
    const reff = firebase.database().ref("users");
    reff.orderByChild("fname").once("value", (snapshot) => {
      this.state.exname = [];
      snapshot.forEach((item) => {
        if (name != item.val().fname) {
          this.state.exname.push({
            fname: item.val().fname,
          });
          this.setState(this.state);
        }
      });
    });
  }
  onPress = (text) => {
    if (text == "group") {
      this.props.navigation.navigate("GroupChat");
    } else {
      flag = 0;
      const currentUser = firebase.auth().currentUser.uid;
      firebase
        .database()
        .ref("users/")
        .on("child_added", (snapshot) => {
          if (text == snapshot.val().fname) {
            key = snapshot.key;
            this.setState(this.state);
          }
        });
      firebase
        .database()
        .ref("users/" + currentUser)
        .on("value", (snapshot) => {
          if (snapshot.child("chat/" + text).exists()) {
            flag++;
          }
        });
      if (flag == 0) {
        firebase
          .database()
          .ref("users/" + currentUser + "/chat/" + text)
          .set({
            shared_id: name + text,
          });
        firebase
          .database()
          .ref("users/" + key + "/chat/" + name)
          .set({
            shared_id: name + text,
          });
      }
      firebase
        .database()
        .ref("users")
        .once("value", (snapshot) => {
          if (snapshot.child("undefined").exists()) {
            firebase
              .database()
              .ref("users/" + key + "/chat/" + name)
              .set({
                shared_id: name + text,
              });
            firebase.database().ref("users/undefined").remove();
          }
        });
      alltext = text;
      this.props.navigation.navigate("OneonOneChat");
    }
  };

  titleCase(str) {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(" ");
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            textAlign: "left",
            fontSize: 15,
            backgroundColor: "#fff",
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Home")}
          >
            <Image
              source={{
                uri: "https://cdn3.iconfinder.com/data/icons/mobile-friendly-ui/100/back_arrow-512.png",
              }}
              style={{ width: 50, height: 50 }}
            />
          </TouchableOpacity>
          <Text
            style={{ fontSize: 20, fontWeight: "bold", left: 120, top: 10 }}
          >
            User List
          </Text>
        </View>
        <Card style={{ height: windowHeight - 50 }}>
          {this.state.fname.slice(0).reverse().map((item) => {
            return (
              <View style={{ top: 10 }} key = {item.fname}>
                <TouchableOpacity
                  style={{
                    width: "100%",
                    height: 85,
                    borderBottomWidth: 1,
                    flexDirection: "row",
                  }}
                  onPress={() => this.onPress(item.fname)}
                >
                  <Image
                    source={{
                      uri: "https://picsum.photos/140/140",
                    }}
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 360,
                      left: 10,
                      top: 10,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "500",
                      left: 20,
                      alignSelf: "center",
                    }}
                  >
                    {this.titleCase(
                      item.fname == "group" ? "group chat" : item.fname
                    )}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}

          {this.state.allname.slice(0).reverse().map((item) => {
            return (
              <View style={{ top: 10 }} key = {item.fname}>
                <TouchableOpacity
                  style={{
                    width: "100%",
                    height: 85,
                    borderBottomWidth: 1,
                    flexDirection: "row",
                  }}
                  onPress={() => this.onPress(item.fname)}
                >
                  <Image
                    source={{
                      uri: "https://picsum.photos/140/140",
                    }}
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 360,
                      left: 10,
                      top: 10,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "500",
                      left: 20,
                      alignSelf: "center",
                    }}
                  >
                    {this.titleCase(
                      item.fname == "group" ? "group chat" : item.fname
                    )}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}

          {this.state.exname.slice(0).reverse().map((item) => {
            return (
              <View style={{ top: 10 }} key = {item.fname}>
                <TouchableOpacity
                  style={{
                    width: "100%",
                    height: 85,
                    borderBottomWidth: 1,
                    flexDirection: "row",
                  }}
                  onPress={() => this.onPress(item.fname)}
                >
                  <Image
                    source={{
                      uri: "https://picsum.photos/140/140",
                    }}
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 360,
                      left: 10,
                      top: 10,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "500",
                      left: 20,
                      alignSelf: "center",
                    }}
                  >
                    {this.titleCase(
                      item.fname == "group" ? "group chat" : item.fname
                    )}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </Card>
      </View>
    );
  }
}
export { alltext };
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
});
