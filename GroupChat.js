// @flow
import React from "react";
import { GiftedChat } from "react-native-gifted-chat";
import {
  View,
  TouchableOpacity,
  Image,
  Platform,
  Text,
  Dimensions
} from "react-native";
import GroupChatSupport from "./GroupChatSupport";
import KeyboardSpacer from "react-native-keyboard-spacer";

const windowHeight = Dimensions.get("window").height;
type Props = {
  name?: string
};

class GroupChat extends React.Component<Props> {
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || "Chat!"
  });

  state = {
    messages: [],
    showAvatarForEveryMessage: false
  };

  get user() {
    return {
      _id: GroupChatSupport.shared.uid,
      avatar: "https://placeimg.com/140/140/any"
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
          <Text style={{ fontSize: 20, fontWeight: "bold", left: 95, top: 20 }}>
            Group Chat
          </Text>
        </View>
        <GiftedChat
          messages={this.state.messages}
          onSend={GroupChatSupport.shared.send}
          user={this.user}
        />
        {Platform.OS === "android" ? <KeyboardSpacer topSpacing={25} /> : null}
      </View>
    );
  }

  componentDidMount() {
    GroupChatSupport.shared.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message)
      }))
    );
  }
  componentWillUnmount() {
    GroupChatSupport.shared.off();
  }
}

export default GroupChat;
