import React from 'react';
import { View, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAP_API_KEY } from '../../../config';

export default function MapViewPage() {
  return (
    <View style={{ flex: 1 }}>
      <GooglePlacesAutocomplete
                            styles={{ container: {
                              flex: 0,
                            },
                            textInput: {
                              fontSize: 18,
                            }
                           }}
                            placeholder="Pickup Where"
                            minLength={2}
                            autoFocus={true}
                            fetchDetails={true}
                            listViewDisplayed={false}
                            onPress={(data, details = null) => {
                                console.log("Data",data);
                                console.log("Details",details);
                            }}
                            query={{
                                key: GOOGLE_MAP_API_KEY,
                                language: 'en',
                            }}
                            nearbyPlacesAPI='GooglePlacesSearch'
                            debounce={400}
                        />
     </View>
  );
}
