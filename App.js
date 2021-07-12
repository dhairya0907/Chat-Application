import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import firebase from "firebase";
import Login from "./Login";
import Join from "./Join";
import Home from "./Home";
import GroupChat from "./GroupChat";
import OneonOneChat from "./OneonOneChat";
import UserList from "./UserList";

const AppNavigator = createStackNavigator(
  {
    Login: { screen: Login },
    Join: { screen: Join },
    Home: { screen: Home },
    GroupChat: { screen: GroupChat },
    OneonOneChat: { screen: OneonOneChat },
    UserList: { screen: UserList }
  },
  {
    initialRouteName: "Login",
    defaultNavigationOptions: {
      headerShown: false,
      gestureEnabled: false
    }
  }
);

const App = createAppContainer(AppNavigator);

var firebaseConfig = {
  apiKey: "AIzaSyB6Ni9XsY2XloxkOk3XQcDJTYnE1XIorpA",
    authDomain: "atgtask2.firebaseapp.com",
    databaseURL: "https://atgtask2.firebaseio.com",
    projectId: "atgtask2",
    storageBucket: "atgtask2.appspot.com",
    messagingSenderId: "900168537257",
    appId: "1:900168537257:web:d6e90097dd90d9d73305b8"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default App;
