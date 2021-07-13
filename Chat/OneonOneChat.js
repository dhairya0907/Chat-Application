// @flow
import React from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { View, TouchableOpacity, Image, Text, Platform } from "react-native";
import OneonOneChatSupport from "./OneonOneChatSupport";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { alltext } from "../Screens/UserList";

type Props = {
  name?: string
};

class OneonOneChat extends React.Component<Props> {
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || "Chat!"
  });

  state = {
    messages: [],
    showAvatarForEveryMessage: false
  };

  get user() {
    return {
      _id: OneonOneChatSupport.shared.uid,
      avatar: "https://picsum.photos/140/140"
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            textAlign: "left",
            fontSize: 15,
            backgroundColor: "#fff"
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Home")}
          >
            <Image
              source={{
                uri:
                  "https://cdn3.iconfinder.com/data/icons/mobile-friendly-ui/100/back_arrow-512.png"
              }}
              style={{ width: 50, height: 50 }}
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: "bold", left: 85, top: 10 }}>
            One on One Chat
          </Text>
        </View>
        <GiftedChat
          messages={this.state.messages}
          onSend={OneonOneChatSupport.shared.send}
          user={this.user}
        />
         {/*Platform.OS === "android" ? <KeyboardSpacer topSpacing={25} /> : null*/}
      </View>
    );
  }

  componentDidMount() {
    OneonOneChatSupport.shared.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message)
      }))
    );
  }
  componentWillUnmount() {
    OneonOneChatSupport.shared.off();
  }
}

export default OneonOneChat;
