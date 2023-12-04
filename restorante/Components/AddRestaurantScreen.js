import React , {useState} from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, Modal, } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AddRestaurantScreen = () => {

  const [isFormVisible, setIsFormVisible] = useState(false);

  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    address: '',
    description: '',
    tags: '',
    rating: 0,
  });
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
    <View>
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
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
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
export default AddRestaurantScreen;