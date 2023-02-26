import {
  Poppins_400Regular,
  Poppins_500Medium,
  useFonts,
} from "@expo-google-fonts/poppins";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthContext from "./src/context/auth.context";
import ProductProvider from "./src/context/products.inventory.context";
import RootNaviagtion from "./src/navigations/root.navigation";

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthContext>
      <ProductProvider>
        <NativeBaseProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <RootNaviagtion />
            </NavigationContainer>
          </SafeAreaProvider>
        </NativeBaseProvider>
      </ProductProvider>
    </AuthContext>
  );
}
