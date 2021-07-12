import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import firebase from "firebase";
import Login from "./Screens/Login";
import Join from "./Screens/Join";
import Home from "./Screens/Home";
import GroupChat from "./Chat/GroupChat";
import OneonOneChat from "./Chat/OneonOneChat";
import UserList from "./Screens/UserList";
import { Firebase } from "./Secrets/Firebase";

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
  apiKey: Firebase.apiKey,
  authDomain: Firebase.authDomain,
  databaseURL: Firebase.databaseURL,
  projectId: Firebase.projectId,
  storageBucket: Firebase.storageBucket,
  messagingSenderId: Firebase.messagingSenderId,
  appId: Firebase.appId,
  measurementId: Firebase.measurementId,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default App;
