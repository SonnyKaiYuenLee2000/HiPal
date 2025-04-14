import { StyleSheet, Image, Platform, View, Modal, TouchableOpacity, Text } from 'react-native';
import { GoogleMap, Marker, MarkerProps, useJsApiLoader } from '@react-google-maps/api'
import { ThemedText } from '../../components/ThemedText';
import { useState, useCallback, useEffect } from 'react';

const center = {
  lat: 21.289965,
  lng: -157.8544448,
}

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


export default function TabTwoScreen() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyD1SX9Mw--fY18OQX8MBKQCfOt2AXZCvYg',
  })

  const [map, setMap] = useState<google.maps.Map|null>(null)
  const [listData, setData] = useState<baseLocationPoint[]>([])
  const [isLoading, setLoading] = useState(true)
  const [selectedPoint, setSelectedPoint] = useState<baseLocationPoint|null>(null)

  const getContact = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3006/')
      const json = await response.json()
      setData(json)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getContact()
  }, [])

const containerStyle = {
  flex: 1,
}
  
  const onLoad = useCallback(function callback(map:google.maps.Map) {
    // Calculate bounds based on fetched data
    const bounds = new window.google.maps.LatLngBounds()
    listData.forEach(item => {
      bounds.extend(new google.maps.LatLng(
        item.pntLatLong.x,
        item.pntLatLong.y
      ))
    })
    if (!bounds.isEmpty()) {
      map.fitBounds(bounds)
    }
    setMap(map)
  }, [listData])

  const onUnmount = useCallback(function callback(map:google.maps.Map) {
    setMap(null)
  }, [])

  const renderMap = () => {
    return isLoaded ? (
      <View style={{ flex: 1 }}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {listData.map((item) => (
            <Marker
              key={item.lngPointKey}
              position={{
                lat: item.pntLatLong.x,
                lng: item.pntLatLong.y
              }}
              onClick={() => setSelectedPoint(item)}
            />
          ))}
        </GoogleMap>
      </View>
    ) : <></>;
  }
  return (
    <View style={{ flex: 1 }}>
      {renderMap()}
      
      <Modal
        visible={!!selectedPoint}
        transparent={true}
        onRequestClose={() => setSelectedPoint(null)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
            <ThemedText type="title">{selectedPoint?.strTitle}</ThemedText>
            <ThemedText>{selectedPoint?.strAddress}</ThemedText>
            <ThemedText>{selectedPoint?.strDescription}</ThemedText>
            
            <TouchableOpacity 
              onPress={() => setSelectedPoint(null)}
              style={{ marginTop: 15, padding: 10, backgroundColor: '#007bff', borderRadius: 5 }}
            >
              <Text style={{ color: 'white', textAlign: 'center' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({});
