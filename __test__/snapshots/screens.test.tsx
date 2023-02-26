import React from "react";
import renderer from 'react-test-renderer';
import LoginScreen from "../../src/screens/login.screen";
import DashboardScreen from "../../src/screens/dashboard.screen";
import AddInventoryScreen from "../../src/screens/addinventory.screen";
import EditInventoryScreen from "../../src/screens/editinventory.screen";
import { NativeBaseProvider } from "native-base";


test('login screen renders correctly', () => {
    const tree = renderer
      .create(<NativeBaseProvider><LoginScreen/></NativeBaseProvider>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('dashboard screen renders correctly', () => {
    const tree = renderer
      .create(<NativeBaseProvider><DashboardScreen/></NativeBaseProvider>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('add inventory renders correctly', () => {
    const tree = renderer
      .create(<NativeBaseProvider><AddInventoryScreen/></NativeBaseProvider>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('edit inventory renders correctly', () => {
    const tree = renderer
      .create(<NativeBaseProvider><EditInventoryScreen/></NativeBaseProvider>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });