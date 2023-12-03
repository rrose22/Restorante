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
    imageUrl: null,
  });

  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleDeleteRestaurant = (key) => {
    setRestaurants((prevRestaurants) =>
      prevRestaurants.filter((restaurant) => restaurant.key !== key)
    );
  };

  const handleEditRestaurant = (restaurant) => {
    setNewRestaurant({
      name: restaurant.name,
      address: restaurant.address,
      description: restaurant.description,
      tags: restaurant.tags,
      rating: restaurant.rating,
      imageUrl: null,
    });
    setRestaurants((prevRestaurants) =>
      prevRestaurants.filter((item) => item.key !== restaurant.key)
    );
    setIsFormVisible(true);
  };

  const addRestaurant = () => {
    if (newRestaurant.name.trim() === '' || newRestaurant.address.trim() === '') {
      alert('Name and Address are required.');
      return;
    }

    if (restaurants.some((item) => item.name === newRestaurant.name)) {
      alert('Restaurant with this name already exists.');
      return;
    }

    setRestaurants((prevRestaurants) => [
      ...prevRestaurants,
      {
        key: prevRestaurants.length + 1,
        ...newRestaurant,
        imageUrl: newRestaurant.imageUrl || 'https://via.placeholder.com/50',
      },
    ]);
    setNewRestaurant({
      name: '',
      address: '',
      description: '',
      tags: '',
      rating: 0,
      imageUrl: null,
    });
    setIsFormVisible(false);
  };

  const pickImage = () => {
    ImagePicker.showImagePicker({ title: 'Select Image' }, (response) => {
      if (!response.didCancel && !response.error) {
        setNewRestaurant((prevRestaurant) => ({ ...prevRestaurant, imageUrl: response.uri }));
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
              source={{ uri: item.imageUrl || 'https://via.placeholder.com/50' }}
              style={styles.thumbnail}
            />
            <View style={styles.detailsContainer}>
              <Text style={styles.listTitle}>{item.name}</Text>
              <Text style={styles.listAddress}>{item.address}</Text>
            </View>
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
          <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            <Text style={styles.buttonText}>Pick an Image</Text>
          </TouchableOpacity>
          {newRestaurant.imageUrl && (
            <Image
              source={{ uri: newRestaurant.imageUrl }}
              style={{ width: 200, height: 200, marginBottom: 10 }}
            />
          )}
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
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Adjusted color to be less intense
  },
  headerSub: {
    fontSize: 15,
    fontStyle: 'italic',
    fontWeight: '300',
    color: '#777', // Adjusted color to be less intense
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Adjusted to match the second set
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd', // Adjusted color to be less intense
    paddingVertical: 10, // Adjusted padding
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
    color: '#333', // Adjusted color to be less intense
  },
  listAddress: {
    fontSize: 14,
    color: '#777', // Adjusted color to be less intense
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#3498db', // Adjusted color to be more in line with the second set
    padding: 10,
    marginRight: 10,
    borderRadius: 5, // Added border radius for a more rounded look
  },
  deleteButton: {
    backgroundColor: '#e74c3c', // Adjusted color to be more in line with the second set
    padding: 10,
    borderRadius: 5, // Added border radius for a more rounded look
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ddd', // Adjusted color to be less intense
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '80%',
  },
  closeButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
  },
});
