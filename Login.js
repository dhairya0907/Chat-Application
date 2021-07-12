import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  Alert
} from "react-native";
import firebase from "firebase";

export class Login extends Component {
  state = {
    email: "test@gmail.com",
    password: "123456"
  };

  _simpleAlertHandler1 = (error) => {
    //function to make simple alert
    alert(error);
  };
  onLogin() {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        this.props.navigation.navigate("Home");
      })
      .catch(error => {
        this._simpleAlertHandler1(error);
      });
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
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <TouchableOpacity
          style={styles.button}
          onPress={this.onLogin.bind(this)}
        >
          <Text style={styles.buttonText}> LOG IN </Text>
        </TouchableOpacity>
        <Text></Text>
        <Text style={styles.titleText2}>Not a member?</Text>
        <Text></Text>
        <Button
          color="#000000"
          onPress={() => this.props.navigation.navigate("Join")}
          title="Join now"
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
    color: "#D3D3D3",
    fontSize: 16
  },
  titleText3: {
    color: "#D3D3D3",
    fontSize: 16,
    textAlign: "right",
    alignSelf: "stretch",
    paddingRight: "8.5%"
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

export default Login;
