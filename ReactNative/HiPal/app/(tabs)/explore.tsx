import { StyleSheet, Image, Platform} from 'react-native';
import { GoogleMap, Marker, MarkerProps, useJsApiLoader } from '@react-google-maps/api'
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
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
    width: '400px',
    height: '400px',
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

  const renderMap = ()=>{
    return isLoaded ? <GoogleMap
    mapContainerStyle={containerStyle}
    center={center}
    zoom={10}
    onLoad={onLoad}
    onUnmount={onUnmount}
  >
    {/* Child components, such as markers, info windows, etc. */}
    {listData.map((item) => (
      <Marker
        key={item.lngPointKey}
        position={{
          lat: item.pntLatLong.x,
          lng: item.pntLatLong.y
        }}
      />
    ))}
  </GoogleMap> : <></>
  }
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>
      <ThemedText>This app includes example code to help you get started.</ThemedText>
      {
        renderMap()
      }
    </ParallaxScrollView>
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
});
