import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import { AuthStepContext } from "../context/auth.context";
import { IProduct } from "../context/products.inventory.context";
import AddInventoryScreen from "../screens/addinventory.screen";
import DashboardScreen from "../screens/dashboard.screen";
import EditInventoryScreen from "../screens/editinventory.screen";
import LoginScreen from "../screens/login.screen";
import { getUser } from "../utils/helpers.utils";

export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
  AddInventory: undefined;
  EditInventory: { product: IProduct };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNaviagtion: React.FC<any> = () => {
  const { user, setUser } = useContext(AuthStepContext);

  React.useEffect(() => {
    getUser((value) => {
      if (typeof value === "string") {
        if (typeof setUser === "function") {
          setUser(JSON.parse(value));
        }
      } else {
        console.log("error");
      }
    });
  }, []);

  return (
    <Stack.Navigator>
      {!user.email ? (
        <Stack.Screen
          name={"Login"}
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <>
          <Stack.Screen
            name={"Dashboard"}
            component={DashboardScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={"AddInventory"}
            component={AddInventoryScreen}
            options={{
              // presentation: "fullScreenModal",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={"EditInventory"}
            component={EditInventoryScreen}
            options={{
              // presentation: "fullScreenModal",
              headerShown: false,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNaviagtion;
