import { Image, StyleSheet, Platform, Button, FlatList, View, Text } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import React, { useEffect, useState } from 'react';

export default function TabThreeScreen() {

    
    const [isLoading, setLoading] = useState(true);

    
    interface baseLocationPoint {
        "lngPointKey" : number
        "strAddress" : string
        "strTitle" : string
        "strDescription" : string
        "pntLatLong" : {
            "x" : number
            "y" : number
        }
    }
    const [listData, setData] = useState<baseLocationPoint[]>([]);

    const getContact = async () => {
        try {
            const response = await fetch('http://127.0.0.1:3000/');
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    const FirstContact = () => { getContact(); }
    useEffect(() => {
        getContact();
    },[])

    const renderItem = ({ item }: { item: baseLocationPoint }) => (
        <View style={styles.itemContainer}>
          <Text style={styles.title}>{item.strTitle}</Text>
          <Text style={styles.description}>{item.strDescription}</Text>
        </View>
      );


  return (
   <>
    <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Da List</ThemedText>
      </ThemedView>
 

      <FlatList
        data={listData}
        renderItem = {renderItem}
        //keyExtractor={(item) => item.lngPointKey}
      />
    
    </>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
});
