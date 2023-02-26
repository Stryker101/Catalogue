//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

type ItemProps = {
    name: string,
    stock: string,
    price: string,
    desc: string,
    tag: string
};

const Item: React.FC<any> = (item: ItemProps) => {
const {name, stock, price, desc, tag} = item;

    return (
        <View style={styles.container}>
            <Text>{name}</Text>
            <Text>{stock}</Text>
            <Text>{price}</Text>
            <Text>{desc}</Text>
            <Text>{tag}</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Item;
