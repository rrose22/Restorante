import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, Modal, StyleSheet, TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ImagePicker from 'react-native-image-picker';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [restaurants, setRestaurants] = useState([
    {
      key: 1,
      name: 'Chipotle',
      address: '38 Barton Ave',
      description: 'Chipotle has top-tier food',
      tags: 'mexican,food,spicy',
      rating: 5,
    }
  ]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState(null);
  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    address: '',
    description: '',
    tags: '',
    rating: 0,
  });

  const addRestaurant = () => {
    if (editingRestaurant) {
      // Update the existing restaurant in-place
      setRestaurants((prevRestaurants) =>
        prevRestaurants.map((item) =>
          item.key === editingRestaurant.key
            ? {
                ...item,
                ...newRestaurant,
              }
            : item
        )
      );
      setEditingRestaurant(null);
    } 
    else {
      setIsFormVisible(true)
      if (
        !newRestaurant.name
      ) {
        return
      }
      else {
        setRestaurants((prevRestaurants) => [
          ...prevRestaurants,
          {
            key: prevRestaurants.length + 1,
            ...newRestaurant,
          },
        ]);
      }
    }
    setIsFormVisible(false)
    setNewRestaurant({
      name: '',
      address: '',
      description: '',
      tags: '',
      rating: 0,
    })


  };
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
    });
    setEditingRestaurant(restaurant);
    
    setIsFormVisible(true);
  };
  return (
    <View style={styles.container}>   
      <FlatList
        style={{ backgroundColor: 'black' }}
        data={restaurants}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Details', { item })}>
            <View style={styles.listItem}>
              <Image
                source={{ uri: 'https://via.placeholder.com/503' }} // Placeholder image URL
                style={styles.thumbnail}
              />
              <View style={styles.detailsContainer}>
                <Text style={styles.listTitle}>{item.name}</Text>
                <Text style={styles.listAddress}>{item.address}</Text>
              </View>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEditRestaurant(item)}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteRestaurant(item.key)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={addRestaurant}>
        <Text style={color='black'}>Add Restaurant</Text>
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
            <Text style={styles.addButtonTxt}>Add Restaurant</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={() => setIsFormVisible(false)}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
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
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 115,
    alignItems: 'center',
    width: '100%',
  
  },
  closeButton: {
    backgroundColor: '#f44336',
    padding: 10,
    alignItems: 'center',
    width: '100%',
  },
  addButtonTxt: {
    color: 'black',
  },
  buttonText: {
    color: 'black',
  },
  editButton: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 5,
    width: '1em'

  },
  deleteButton: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 5,
    width: '1em',
    marginLeft: 4 
  }
});

export default HomeScreen