import React from 'react';
import { View, Text, Image, TouchableOpacity} from 'react-native';
import { StyleSheet } from 'react-native';

const DetailsScreen = ({ route }) => {
  
  const { item } = route.params;

 

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://via.placeholder.com/503' }}
        style={styles.thumbnail}
      />
      <View style={styles.detailsContainer}>
        <Text>{item.name}</Text>
        <Text>{item.address}</Text>
        <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEditRestaurant(item)}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteRestaurant(item.key)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  thumbnail: {
    width: 100,
    height: 65,
    borderRadius: 5,
    margin: 0,
    marginRight: 10,
   
  },
  detailsContainer: {
    flex: 1,
  },
  
});
export default DetailsScreen;
