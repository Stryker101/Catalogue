import { MaterialIcons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Button,
  HStack,
  Icon,
  Input,
  Modal,
  Pressable,
  Text,
  TextArea,
  useToast,
  View,
  VStack,
} from "native-base";
import React, { useContext, useState } from "react";
import { ActivityIndicator, useWindowDimensions } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { AuthStepContext } from "../context/auth.context";
import {
  ProductContext,
  ProductContextType,
} from "../context/products.inventory.context";
import { RootStackParamList } from "../navigations/root.navigation";

const EditInventoryScreen: React.FC<any> = () => {
  const {
    params: { product },
  } = useRoute<RouteProp<RootStackParamList, "EditInventory">>();
  const [showModal, setShowModal] = React.useState(false);
  const { user } = useContext(AuthStepContext);
  const [name, setName] = useState<string>(product.name);
  const [stock, setStock] = useState<string>(product.stock.toString());
  const [price, setPrice] = useState<string>(product.price.toString());
  const [description, setDescription] = useState<string>(product.description);
  const [nameErrorStatus, setNameErrorStatus] = React.useState<string | null>(
    null
  );
  const [stockErrorStatus, setStockErrorStatus] = React.useState<string | null>(
    null
  );
  const [priceErrorStatus, setPriceErrorStatus] = React.useState<string | null>(
    null
  );
  const [descriptionErrorStatus, setDescriptionErrorStatus] = React.useState<
    string | null
  >(null);
  const [loading, setLoading] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  const handleOnTextChange = (text: string, valueFor: string) => {
    if (valueFor === "name") setName(text);
    if (valueFor === "stock") setStock(text);
    if (valueFor === "price") setPrice(text);
    if (valueFor === "desc") setDescription(text);
  };

  const naviagtion =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const isDesc = (desc: string): boolean => {
    let regex = /^([\S]+)\s([\S]+)\s([\S]+)/g;

    if (desc.match(regex)) return true;
    else return false;
  };

  React.useEffect(() => {
    if (nameErrorStatus) {
      setTimeout(() => {
        setNameErrorStatus(null);
      }, 3000);
    }

    if (priceErrorStatus) {
      setTimeout(() => {
        setPriceErrorStatus(null);
      }, 3000);
    }
    if (stockErrorStatus) {
      setTimeout(() => {
        setStockErrorStatus(null);
      }, 3000);
    }
    if (descriptionErrorStatus) {
      setTimeout(() => {
        setDescriptionErrorStatus(null);
      }, 3000);
    }
  }, [
    nameErrorStatus,
    priceErrorStatus,
    stockErrorStatus,
    descriptionErrorStatus,
  ]);

  const toast = useToast();

  const { updateProduct, deleteProduct } = React.useContext(
    ProductContext
  ) as ProductContextType;

  const insets = useSafeAreaInsets();

  function handleSubmit(): void {
    if (name === "") setNameErrorStatus("Required");

    if (stock === "") setStockErrorStatus("Required");

    if (price === "") setPriceErrorStatus("Required");

    if (description === "") setDescriptionErrorStatus("Required");

    if (!isDesc(description))
      setDescriptionErrorStatus("Must be above 2 words");

    if (
      name === "" ||
      price === "" ||
      !isDesc(description) ||
      stock === "" ||
      description === ""
    ) {
      return;
    }

    let tag = user.email!;

    setLoading(true);
    let update = {
      id: product.id,
      name,
      price: parseInt(price),
      description,
      stock: parseInt(stock),
      tag,
    };

    updateProduct(update);
    toast.show({
      duration: 2000,
      placement: "top",
      render: () => (
        <View bg={"green.400"} p={3} w={useWindowDimensions().width - 16}>
          <Text
            fontFamily="Poppins_400Regular"
            fontSize={16}
            lineHeight={20}
            textAlign="center"
            color={"white"}
          >
            Updated Successfully
          </Text>
        </View>
      ),
    });
    naviagtion.goBack();
    setLoading(false);
  }

  function confirmDelete() {
    setShowModal(true);
  }

  function handleDelete(): void {
    setDeleting(true);
    deleteProduct(product.id, () => {
      setDeleting(false);
      naviagtion.goBack();
    });
  }

  function handleYes(): void {
    handleDelete();
    setShowModal(false);
  }

  function handleNo(): void {
    setShowModal(false);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View flex={1} p={3}>
        <HStack justifyContent={"space-between"} space={3} mt={4}>
          <Text fontFamily="Poppins_500Medium" fontSize={20} lineHeight={32}>
            Edit Inventory
          </Text>
          <Pressable shadow={2} onPress={() => naviagtion.goBack()}>
            <Icon
              size={6}
              color={"black"}
              as={<MaterialIcons name="cancel" size={24} color="black" />}
            />
          </Pressable>
        </HStack>
        <View flex={1} mt={insets.top}>
          <VStack flex={1} space={5}>
            <VStack space={1}>
              <Input
                type="text"
                p={4}
                rounded={8}
                autoCapitalize="none"
                placeholder="Name"
                fontFamily="Poppins_400Regular"
                fontSize={16}
                value={name}
                onChangeText={(text) => handleOnTextChange(text, "name")}
              />
              {nameErrorStatus && (
                <Text
                  fontFamily="Poppins_400Regular"
                  fontSize={12}
                  color={"tomato"}
                >
                  {nameErrorStatus}
                </Text>
              )}
            </VStack>
            <VStack space={1}>
              <Input
                p={4}
                type="text"
                rounded={8}
                fontFamily="Poppins_400Regular"
                fontSize={16}
                keyboardType="number-pad"
                placeholder="Total Stock"
                value={stock}
                onChangeText={(text) => handleOnTextChange(text, "stock")}
              />
              {stockErrorStatus && (
                <Text
                  fontFamily="Poppins_400Regular"
                  fontSize={12}
                  color={"tomato"}
                >
                  {stockErrorStatus}
                </Text>
              )}
            </VStack>
            <VStack space={1}>
              <Input
                p={4}
                type="text"
                rounded={8}
                fontFamily="Poppins_400Regular"
                fontSize={16}
                keyboardType="number-pad"
                placeholder="Price"
                value={price}
                InputLeftElement={
                  <Text
                    ml={5}
                    fontFamily={"Poppins_400Regular"}
                    fontWeight={700}
                    fontSize={16}
                  >
                    ₦
                  </Text>
                }
                onChangeText={(text) => handleOnTextChange(text, "price")}
              />
              {priceErrorStatus && (
                <Text
                  fontFamily="Poppins_400Regular"
                  fontSize={12}
                  color={"tomato"}
                >
                  {priceErrorStatus}
                </Text>
              )}
            </VStack>
            <VStack space={1}>
              <TextArea
                autoCompleteType
                p={"4"}
                type="text"
                rounded={8}
                fontFamily="Poppins_400Regular"
                fontSize={16}
                numberOfLines={5}
                placeholder="Description"
                multiline
                autoCapitalize="none"
                value={description}
                onChangeText={(text) => handleOnTextChange(text, "desc")}
              />
              {descriptionErrorStatus && (
                <Text
                  fontFamily="Poppins_400Regular"
                  fontSize={12}
                  color={"tomato"}
                >
                  {descriptionErrorStatus}
                </Text>
              )}
            </VStack>
          </VStack>
          <VStack space={2}>
            <Button onPress={handleSubmit}>
              <Text
                fontFamily="Poppins_400Regular"
                fontWeight={500}
                fontSize={16}
                color="white"
              >
                {!loading ? "Update Item" : <ActivityIndicator />}
              </Text>
            </Button>
            <Button variant={"unstyled"} bg={"red.400"} onPress={confirmDelete}>
              <Text
                fontFamily="Poppins_400Regular"
                fontWeight={500}
                fontSize={16}
                color="white"
              >
                {!deleting ? "Delete" : <ActivityIndicator />}
              </Text>
            </Button>
          </VStack>
        </View>
      </View>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px" p={5} rounded={28}>
          <Modal.Header borderBottomWidth={0} alignItems="center">
            <Text
              fontFamily="Poppins_400Regular"
              fontWeight={500}
              fontSize={16}
              lineHeight={30}
            >
              Delete ?
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Text
              fontFamily="Poppins_400Regular"
              fontSize={16}
              lineHeight={30.5}
            >
              Are you sure you want to delete {product.name}?
            </Text>
          </Modal.Body>
          <Modal.Footer borderTopWidth={0}>
            <Button.Group flex={1} space={2}>
              <Button
                variant="ghost"
                flex={1}
                colorScheme="blueGray"
                onPress={() => handleNo()}
              >
                <Text
                  fontFamily="Poppins_400Regular"
                  fontSize={16}
                  lineHeight={30.5}
                >
                  No
                </Text>
              </Button>
              <Button variant="ghost" flex={1} onPress={() => handleYes()}>
                <Text
                  fontFamily="Poppins_400Regular"
                  fontSize={16}
                  lineHeight={30.5}
                >
                  Yes
                </Text>
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </SafeAreaView>
  );
};

export default EditInventoryScreen;
