import { MaterialIcons } from "@expo/vector-icons";
import { Button, Icon, Input, Text, View, VStack } from "native-base";
import React, { useContext } from "react";
import { ActivityIndicator, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthStepContext } from "../context/auth.context";
import { storeUser } from "../utils/helpers.utils";

const LoginScreen: React.FC<any> = () => {
  const [show, setShow] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>("");
  const [emailErrorStatus, setEmailErrorStatus] = React.useState<string | null>(
    null
  );
  const [password, setPassword] = React.useState<string>("");
  const [passwordErrorStatus, setPasswordErrorStatus] = React.useState<
    string | null
  >(null);
  const [loading] = React.useState(false);
  const { setUser } = useContext(AuthStepContext);

  function isEmail(email: string): boolean {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email.match(regex)) return true;
    else return false;
  }

  function handleSubmit(): void {
    if (email === "") setEmailErrorStatus("Required");

    if (!isEmail(email)) setEmailErrorStatus("Invalid email");

    if (password === "") setPasswordErrorStatus("Required");

    if (email === "" || !isEmail(email) || password === "") {
      return;
    }

    if (typeof setUser === "function") {
      let user = {
        email,
        password,
      };
      setUser(user);

      storeUser(JSON.stringify(user));
    }
  }

  React.useEffect(() => {
    if (emailErrorStatus) {
      setTimeout(() => {
        setEmailErrorStatus(null);
      }, 3000);
    }

    if (passwordErrorStatus) {
      setTimeout(() => {
        setPasswordErrorStatus(null);
      }, 3000);
    }
  }, [emailErrorStatus, passwordErrorStatus]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View flex={1} p={3}>
        <VStack flex={1} space={8} mt={4}>
          <VStack space={5}>
            <Text fontFamily="Poppins_500Medium" fontSize={20} lineHeight={32}>
              Welcome
            </Text>
            <Text
              fontFamily="Poppins_400Regular"
              fontSize={16}
              lineHeight={30.5}
            >
              Sign in to continue using {"\n"}this service
            </Text>
          </VStack>

          <VStack space={4}>
            <VStack space={1}>
              <Input
                type="text"
                p={4}
                rounded={8}
                autoCapitalize="none"
                placeholder="Email address"
                fontFamily="Poppins_400Regular"
                fontSize={16}
                onChangeText={(text: string) => setEmail(text)}
              />
              {emailErrorStatus && (
                <Text
                  fontFamily="Poppins_400Regular"
                  fontSize={12}
                  color={"tomato"}
                >
                  {emailErrorStatus}
                </Text>
              )}
            </VStack>

            <VStack space={1}>
              <Input
                type={show ? "text" : "password"}
                p={4}
                rounded={8}
                fontFamily="Poppins_400Regular"
                fontSize={16}
                onChangeText={(text: string) => setPassword(text)}
                InputRightElement={
                  <Pressable onPress={() => setShow(!show)}>
                    <Icon
                      as={
                        <MaterialIcons
                          name={show ? "visibility" : "visibility-off"}
                        />
                      }
                      size={5}
                      mr="2"
                      color="muted.400"
                    />
                  </Pressable>
                }
                placeholder="Password"
              />
              {passwordErrorStatus && (
                <Text
                  fontFamily="Poppins_400Regular"
                  fontSize={12}
                  color={"tomato"}
                >
                  {passwordErrorStatus}
                </Text>
              )}
            </VStack>
          </VStack>
        </VStack>
        <VStack space={8}>
          <Button mx={50} p={3} onPress={handleSubmit}>
            <Text
              fontFamily="Poppins_400Regular"
              fontWeight={500}
              fontSize={16}
              color="white"
            >
              {!loading ? "Login" : <ActivityIndicator />}
            </Text>
          </Button>
        </VStack>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
