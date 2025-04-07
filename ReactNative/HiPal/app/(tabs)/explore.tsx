import { StyleSheet, Image, Platform} from 'react-native';
import { GoogleMap, Marker, MarkerProps, useJsApiLoader } from '@react-google-maps/api'
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useState, useCallback } from 'react';

const center = {
  lat: 21.289965,
  lng: -157.8544448,
}

const markerPosition = {
  lat: 21.292008,
  lng:-157.8479726,
}


export default function TabTwoScreen() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyD1SX9Mw--fY18OQX8MBKQCfOt2AXZCvYg',
  })

  const [map, setMap] = useState<google.maps.Map|null>(null)

  const containerStyle = {
    width: '400px',
    height: '400px',
  }
  
  const onLoad = useCallback(function callback(map:google.maps.Map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bothBounds = new google.maps.LatLngBounds(center, markerPosition)
    const bounds = new window.google.maps.LatLngBounds(bothBounds)
    map.fitBounds(bounds)

    setMap(map)
  }, [])

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
    <Marker
    position = { {
      lat: 21.292008,
      lng:-157.8479726,
    }}/>
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
