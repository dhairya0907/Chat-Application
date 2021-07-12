import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView
} from "react-native";
import firebase from "firebase";

var flag = 0;
var group = 0;
export class Join extends Component {
  state = {
    email: "",
    fname: ""
  };

  _simpleAlertHandler = () => {
    //function to make simple alert
    alert("Account Created");
  };
  _simpleAlertHandler1 = (error) => {
    //function to make simple alert
    alert(error);
  };
  onLogin() {
    const { email, fname } = this.state;
    flag = 0;
    firebase
      .database()
      .ref("users")
      .on("child_added", snapshot => {
        if (fname.toLowerCase() == snapshot.val().fname) {
          flag++;
        }
      });

    if (flag == 0) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(data => {
          firebase
            .database()
            .ref("users/" + data.user.uid)
            .set({
              email: email,
              fname: fname.toLowerCase()
            });
          firebase
            .database()
            .ref("group")
            .once("value", snapshot => {
              group = snapshot.val();
              firebase
                .database()
                .ref("total/" + fname.toLowerCase())
                .set({
                  group: group
                });
            });
          this._simpleAlertHandler();
          this.props.navigation.navigate("Login");
        })
        .catch(error => {
          this._simpleAlertHandler1(error);
        });
    } else {
      this._simpleAlertHandler1("There was some problem.");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>YOUR ACCOUNT FOR</Text>
        <Text style={styles.titleText1}>Chat Application</Text>
        <Text></Text>
        <Text></Text>
        <TextInput
          value={this.state.email}
          keyboardType="email-address"
          onChangeText={email => this.setState({ email })}
          placeholder="Email"
          placeholderTextColor="black"
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          placeholder={"Password"}
          secureTextEntry={true}
          placeholderTextColor="black"
          style={styles.input}
        />
        <TextInput
          value={this.state.fname}
          onChangeText={fname => this.setState({ fname })}
          placeholder={"Nick Name"}
          placeholderTextColor="black"
          style={styles.input}
        />
        <Text></Text>
        <TouchableOpacity
          style={styles.button}
          onPress={this.onLogin.bind(this)}
        >
          <Text style={styles.buttonText}> CREATE ACCOUNT </Text>
        </TouchableOpacity>
        <Text style={styles.titleText2}>Already a member?</Text>
        <Text></Text>
        <Button
          color="#000000"
          onPress={() => this.props.navigation.navigate("Login")}
          title="Sign in"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center"
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 35,
    marginTop: 70
  },
  titleText1: {
    fontSize: 35,
    fontWeight: "bold"
  },
  titleText2: {
    fontSize: 19,
    textAlign: "center",
    marginTop: 40
  },
  button: {
    alignItems: "center",
    backgroundColor: "black",
    width: 300,
    height: 44,
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  },
  buttonText: {
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center",
    color: "white"
  },
  input: {
    width: 200,
    fontSize: 20,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginVertical: 10,
    width: 350
  }
});

export default Join;
