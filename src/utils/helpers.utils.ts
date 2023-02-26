import AsyncStorage from "@react-native-async-storage/async-storage";

const userKey = "user__";
const enteries = "enteries__"
const productsKey = "products__"

export const storeUser = async (value: string, callback?: (error?: any) => void) => {
    try {
      await AsyncStorage.setItem(userKey, value)
      callback && callback();
    } catch (e) {
        callback && callback(e);
    }
  }

  export const storeProducts = async (value: string, callback?: (error?: any) => void) => {
    try {
      await AsyncStorage.setItem(productsKey, value)
      callback && callback();
    } catch (e) {
        callback && callback(e);
    }
  }
  
  export const getProducts = async (callback?: (value: string) => void) => {
    try {
      const value = await AsyncStorage.getItem(productsKey)
      if(value !== null) {
        // value previously stored
        callback && callback(value);
      }
    } catch(e) {
      // error reading value
    }
  }

 export const getUser = async (callback?: (value: string | unknown) => void) => {
    try {
      const value = await AsyncStorage.getItem(userKey)
      if(value !== null) {
        // value previously stored
        callback && callback(value);
      }
    } catch(e) {
      // error reading value
      callback && callback(e);
    }
  }

  export const removeUser = async () => {
    try {
      await AsyncStorage.removeItem(userKey)
    } catch(e) {
      // remove error
    }
  }
  export const addItem = async (value: string, callback?: (error?: any) => void) => {
    try {
      await AsyncStorage.setItem(enteries, value)
      callback && callback();
    } catch (e) {
        callback && callback(e);
    }
  }

  export const getItem = async (callback?: (value: string | unknown) => void) => {
    try {
      const value = await AsyncStorage.getItem(enteries)
      if(value !== null) {
        // value previously stored
        callback && callback(value);
      }
    } catch(e) {
      // error reading value
      callback && callback(e);
    }
  }