import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  Modal,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';


export default function App() {
  const [restaurants, setRestaurants] = useState([
    {
      key: 1,
      name: 'Chipotle',
      address: '38 Barton Ave',
      description: 'Chipotle has top-tier food',
      tags: 'mexican,food,spicy',
      rating: 5,
    },
    {
      key: 2,
      name: 'Chic Fil A',
      address: '38 Barton Ave',
      description: 'Chic Fil A has top-tier food',
      tags: 'mexican,food,spicy',
      rating: 4,
    },
  ]);

  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    address: '',
    description: '',
    tags: '',
    rating: 0,
  });

  const [isFormVisible, setIsFormVisible] = useState(false);

  const addRestaurant = () => {
    ImagePicker.showImagePicker({ title: 'Select Image' }, (response) => {
      if (!response.didCancel && !response.error) {
        setRestaurants((prevRestaurants) => [
          ...prevRestaurants,
          {
            key: prevRestaurants.length + 1,
            ...newRestaurant,
            imageUrl: response.uri,
          },
        ]);
        setNewRestaurant({
          name: '',
          address: '',
          description: '',
          tags: '',
          rating: 0,
        });
        setIsFormVisible(false);
      }
    });
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Restaurante</Text>
        <Text style={styles.headerSub}>This is a restaurant saving application</Text>
      </View>

      <FlatList
        style={{ backgroundColor: 'black' }}
        data={restaurants}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image
              source={{ uri: 'https://via.placeholder.com/50' }} // Placeholder image URL
              style={styles.thumbnail}
            />
            <View style={styles.detailsContainer}>
              <Text style={styles.listTitle}>{item.name}</Text>
              <Text style={styles.listAddress}>{item.address}</Text>
            </View>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setIsFormVisible(true)}>
        <Text style={styles.buttonText}>Add Restaurant</Text>
      </TouchableOpacity>

      <Modal visible={isFormVisible} animationType="slide">
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Restaurant Name"
            value={newRestaurant.name}
            onChangeText={(text) => setNewRestaurant({ ...newRestaurant, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={newRestaurant.address}
            onChangeText={(text) => setNewRestaurant({ ...newRestaurant, address: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={newRestaurant.description}
            onChangeText={(text) => setNewRestaurant({ ...newRestaurant, description: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Tags"
            value={newRestaurant.tags}
            onChangeText={(text) => setNewRestaurant({ ...newRestaurant, tags: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Rating"
            keyboardType="numeric"
            value={newRestaurant.rating.toString()}
            onChangeText={(text) => setNewRestaurant({ ...newRestaurant, rating: parseFloat(text) })}
          />
          <TouchableOpacity style={styles.addButton} onPress={addRestaurant}>
            <Text style={styles.buttonText}>Add Restaurant</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={() => setIsFormVisible(false)}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    paddingTop: 40,
    paddingLeft: 20,
    paddingBottom: 10,
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSub: {
    marginTop: 0,
    padding: 0,
    fontSize: 15,
    fontStyle: 'italic',
    fontWeight: '300',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  listAddress: {
    fontSize: 14,
    color: 'white',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
  },
});
