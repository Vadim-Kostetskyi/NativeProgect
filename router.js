import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native";

import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import HomeScreen from "./Screens/Home";
import CreatePostsScreen from "./Screens/CreatePostsScreen";
import PostsScreen from "./Screens/PostsScreen";
import CommentsScreen from "./Screens/CommentsScreen";
import MapScreen from "./Screens/MapScreen";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { authSignOutUser } from "./redux/auth/authOperations";
import { useDispatch } from "react-redux";

import {
  Ionicons,
  AntDesign,
  Feather,
  SimpleLineIcons,
} from "@expo/vector-icons";

const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const logOut = (dispatch) => {
  dispatch(authSignOutUser());
};

function HomeStack() {
  const dispatch = useDispatch();
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          title: "Публикации",
          headerRight: () => (
            <Feather
              name="log-out"
              size={24}
              color="#BDBDBD"
              onPress={() => logOut(dispatch)}
              style={{ marginRight: 16 }}
            />
          ),
        }}
      />
      <AuthStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{ title: "Комментарии" }}
      />
      <AuthStack.Screen
        name="Map"
        component={MapScreen}
        options={{ title: "Карта" }}
      />
    </AuthStack.Navigator>
  );
}

const routerScreen = (isAuth) => {
  const dispatch = useDispatch();

  if (!isAuth) {
    return (
      <>
        <AuthStack.Navigator>
          <AuthStack.Screen name="Register" component={RegistrationScreen} />
          <AuthStack.Screen name="Home" component={HomeScreen} />
          <AuthStack.Screen name="Login" component={LoginScreen} />
        </AuthStack.Navigator>
        <StatusBar style="auto" />
      </>
    );
  }
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: 70,
          height: 40,
          borderRadius: 20,
        },
        tabBarStyle: {
          height: 80,
          paddingTop: 10,
          paddingBottom: 20,
          paddingLeft: 75,
          paddingRight: 75,
        },
        tabBarActiveBackgroundColor: "#FF6C00",
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "rgba(33, 33, 33, 0.8)",
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="PostsScreen"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TouchableOpacity>
              <SimpleLineIcons name="grid" size={24} color={color} />
            </TouchableOpacity>
          ),
          headerShown: false,
          headerStyle: {
            // backgroundColor: "#f4511e",
          },
          headerTitleStyle: {
            // fontWeight: "bold",
            // fontSize: 20,
          },
        }}
      />
      <Tabs.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        style={{ width: 70 }}
        options={{
          title: "Создать публикацию",
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="plus" size={24} color={color} back />
          ),
          headerRight: () => (
            <Feather
              name="log-out"
              size={24}
              color="#BDBDBD"
              onPress={() => logOut(dispatch)}
              style={{ marginRight: 16 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="user" size={24} color={color} />
          ),
          headerRight: () => (
            <Feather
              name="log-out"
              size={24}
              color="#BDBDBD"
              style={{ marginRight: 16 }}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default routerScreen;
