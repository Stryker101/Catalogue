import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  FlatList,
  HStack,
  Icon,
  Pressable,
  Text,
  View,
  VStack,
} from "native-base";
import React, { useContext } from "react";
import { useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthStepContext } from "../context/auth.context";
import {
  ProductContext,
  ProductContextType,
} from "../context/products.inventory.context";
import { RootStackParamList } from "../navigations/root.navigation";
import { removeUser } from "../utils/helpers.utils";

const DashboardScreen: React.FC<any> = () => {
  const naviagtion =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user, setUser } = useContext(AuthStepContext);
  const { products } = React.useContext(ProductContext) as ProductContextType;

  function handleLogout(): void {
    removeUser();
    if (typeof setUser === "function") {
      setUser({ email: null, password: null });
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View flex={1} p={3}>
        <HStack
          alignItems={"center"}
          justifyContent={"space-between"}
          space={3}
          mt={4}
        >
          <Text fontFamily="Poppins_500Medium" fontSize={20} lineHeight={32}>
            Dashboard
          </Text>
          <Pressable onPress={handleLogout}>
            <HStack alignItems="center" space={1}>
              <Text
                fontFamily="Poppins_400Regular"
                fontSize={14}
                fontWeight={500}
                lineHeight={20}
                color={"red.400"}
              >
                Logout
              </Text>
              <Icon
                size={6}
                color={"red.400"}
                as={
                  <MaterialIcons name="exit-to-app" size={24} color="black" />
                }
              />
            </HStack>
          </Pressable>
        </HStack>
        <View flex={1} px={1} position={"relative"}>
          <Pressable
            shadow={5}
            position={"absolute"}
            zIndex={9999}
            bottom={5}
            right={5}
            onPress={() => {
              naviagtion.navigate("AddInventory");
            }}
          >
            <Icon
              as={<AntDesign name="pluscircle" size={24} color="black" />}
              size={20}
              color={"black"}
            />
          </Pressable>
          <Text fontFamily="Poppins_400Regular" fontSize={16} lineHeight={30}>
            {user.email?.toLowerCase()}
          </Text>
          <FlatList
            contentContainerStyle={{ marginTop: 12 }}
            data={products}
            horizontal={false}
            numColumns={2}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() => {
                  naviagtion.navigate("EditInventory", { product: item });
                }}
              >
                <View
                  shadow={2}
                  p={5}
                  py={6}
                  position={"relative"}
                  bg={"white"}
                  rounded={8}
                  mb={3}
                  width={useWindowDimensions().width / 2 - 16 - 6}
                  mr={index % 2 === 0 ? 3 : 0}
                >
                  {item.stock > 0 ? (
                    <View
                      bg={"green.100"}
                      position={"absolute"}
                      top={0}
                      right={0}
                      roundedTopRight={8}
                      px={1}
                    >
                      <Text
                        color={"green.400"}
                        fontFamily={"Poppins_500Medium"}
                        fontSize={12}
                        lineHeight={20}
                      >
                        in stock
                      </Text>
                    </View>
                  ) : (
                    <View
                      bg={"red.100"}
                      position={"absolute"}
                      top={0}
                      right={0}
                      roundedTopRight={8}
                      px={1}
                    >
                      <Text
                        color={"red.400"}
                        fontFamily={"Poppins_500Medium"}
                        fontSize={12}
                        lineHeight={20}
                      >
                        out of stock
                      </Text>
                    </View>
                  )}
                  <VStack space={2}>
                    <HStack alignItems={"center"} space={2}>
                      <Text
                        noOfLines={1}
                        flex={1}
                        fontFamily={"Poppins_500Medium"}
                        fontSize={16}
                        lineHeight={30}
                      >
                        {item.name}
                      </Text>
                      <Text
                        fontFamily={"Poppins_400Regular"}
                        fontSize={12}
                        lineHeight={20}
                      >
                        {Intl.NumberFormat("en-NG", {
                          style: "currency",
                          currency: "NGN",
                        })
                          .format(item.price)
                          .toString()
                          .replace(".00", "")}
                      </Text>
                    </HStack>
                    <Text
                      noOfLines={1}
                      fontFamily={"Poppins_400Regular"}
                      fontSize={12}
                      lineHeight={20}
                    >
                      {item.description}
                    </Text>
                    <Text
                      noOfLines={1}
                      fontFamily={"Poppins_200Regular"}
                      fontSize={10}
                      lineHeight={20}
                      color = "cyan.900"
                    >
                      Added by {item.tag}
                    </Text>
                  </VStack>
                </View>
              </Pressable>
            )}
          ></FlatList>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;
