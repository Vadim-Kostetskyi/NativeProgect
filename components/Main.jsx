import routerScreen from "../router";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { authStateChanged } from "../redux/auth/authOperations";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Main = () => {
  const dispatch = useDispatch();

  const logIn = useSelector((state) => state.isLogIn);

  useEffect(() => {
    dispatch(authStateChanged());
  }, []);

  const routing = routerScreen(logIn);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
