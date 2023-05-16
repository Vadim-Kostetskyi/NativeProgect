import { NavigationContainer } from "@react-navigation/native";
import routerScreen from "./router";

export default function App() {
  const routing = routerScreen(123);
  return <NavigationContainer>{routing}</NavigationContainer>;
}
