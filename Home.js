import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Welcome To</Text>
        <Text style={styles.titleText2}>ATG Chat</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate("UserList")}
        >
          <Text style={styles.buttonText}> Chat </Text>
        </TouchableOpacity>
        <Text></Text>
        <Text></Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}> Log Out </Text>
        </TouchableOpacity>
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
    fontSize: 45,
    marginTop: 100
  },
  titleText2: {
    fontWeight: "bold",
    fontSize: 40
  },
  button: {
    top: 100,
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
  }
});

export default Home;
