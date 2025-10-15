import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, TextInput,  Button, TouchableOpacity, } from 'react-native';


const UserItem = ({
  name,
  age,
  favouritecolour,
  onDelete,

}) => (
  <View style={styles.item}>
    <Text style={styles.name}>Name: {name}</Text>
    <Text style={styles.age}>Age: {age}</Text>
    <Text style={styles.color}>Favourite Colour: {favouritecolour}</Text>

  <TouchableOpacity style={styles.deletebutton} onPress={onDelete}>
    <Text style={styles.btnText} > Delete </Text>
  </TouchableOpacity>
  </View>
);

export default function App() {
  // Array of users stored in state
  const [users, setUsers] = useState([
    { id: "1", dishname: "Siya", price: 25, description: "Red" },
    { id: "2", dishname: "Caryn", price: 30, description: "Blue" },
    { id: "3", dishname: "Jaco", price: 22, description: "Green" },
    { id: "4", dishname: "Mihle", price: 28, description: "Yellow" },
    { id: "5", dishname: "Koosie", price: 19, description: "Purple" },
  ]);

  // State for input fields
  const [newDishName, setNewDishName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCourse, setNewCourse] = useState("");
  const [newPrice, setNewPrice] = useState("");

  // Function to add new user
  const addUser = () => {
    if (!newDishName || !newDescription || !newCourse || !newPrice) return; // Require all fields
    const newUser = {
      id: (users.length + 1).toString(),
      dishname: newDishName,
      description: newDescription
      price: parseInt(newPrice),
      course: newCourse,
    };
    setUsers([...users, newUser]); // Adds a new user to array
    setNewDishName("");
    setNewDescription("");
    setNewCourse("");
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id))
  }

  return (
     <View style={styles.container}>
      <Text style={styles.title}> Gugs FlatList</Text>

      {/* Input fields */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter dish name"
          value={newDishName}
          onChangeText={setNewDishName}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter price"
          value={newPrice}
          onChangeText={setNewPrice}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Select course"
          value={newCourse}
          onChangeText={setNewCourse}
        />
         <TextInput
          style={styles.input}
          placeholder="Enter description of the dish"
          value={newDescription}
          onChangeText={setNewDescription}
        />
        <Button title="Add User" onPress={addUser} />
      </View>

      {/* FlatList */}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <UserItem
            dishname={item.dishname}
            price={item.price}
            description={item.description}
            course={item.course}
            onDelete={() => deleteUser(item.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#555",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  item: {
    backgroundColor: "#edf1ebff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  age: {
    fontSize: 14,
    color: "#555",
  },
  color: {
    fontSize: 14,
    color: "#333",
  },

  deletebutton:{
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center"

  },
  btnText:{
    color: "white",
    fontWeight: "bold"
  }
});

