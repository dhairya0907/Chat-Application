import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import firebase from "firebase";
import Login from "./Login";
import Join from "./Join";
import Home from "./Home";
import GroupChat from "./GroupChat";
import OneonOneChat from "./OneonOneChat";
import UserList from "./UserList";
//import { Firebase } from "./Secrets/Firebase";

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
  apiKey: secrets.Firebase_apiKey,
  authDomain: secrets.Firebase_authDomain,
  databaseURL: secrets.Firebase_databaseURL,
  projectId: secrets.Firebase_projectId,
  storageBucket: secrets.Firebase_storageBucket,
  messagingSenderId: secrets.Firebase_messagingSenderId,
  appId: secrets.Firebase_appId,
  measurementId: secrets.Firebase_measurementId,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default App;
