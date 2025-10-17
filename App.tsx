import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, TextInput,  Button, TouchableOpacity, } from 'react-native';



const UserItem = ({
  dishname,
  course,
  price,
  description,
  onDelete,

}) => (
  <View style={styles.item}>
    <Text style={styles.dishname}>Name: {dishname}</Text>
    <Text style={styles.description}>Description: {description}</Text>
    <Text style={styles.course}>Course: {course}</Text>
    <Text style={styles.price}>Price: R {price}</Text>

  <TouchableOpacity style={styles.deletebutton} onPress={onDelete}>
    <Text style={styles.btnText} > Delete </Text>
  </TouchableOpacity>
  </View>
);

export default function App() {
  // Array of users stored in state
  const [users, setUsers] = useState([
    { id: "1", dishname: "Cabbage Soup", price: 120, description: "Warm, spicy cabbage soup" , course: "Starter"},
    { id: "2", dishname: "Beef Wellington", price: 250, description: "Juicy tenderloin wrapped in mushroom duxelles and encased in a puff pastry crust", course: "Main" },
    { id: "3", dishname: "Creme Brulee", price: 80, description: "French delicious creamy vanilla dessert", course: "Dessert" },
    { id: "4", dishname: "Classic French Onion Soup", price: 95, description: "Rich, caramelized onion base and goeey cheese topping", course: "Starter" },
    { id: "5", dishname: "Filet Mignon with Red Wine Reduction", price: 190, description: "Cooked filet mignon with a rich,red wine reduction.", course: "Main" },
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
      description: newDescription,
      price: parseInt(newPrice),
      course: newCourse,
    };
    setUsers([...users, newUser]); // Adds a new user to array
    setNewDishName("");
    setNewDescription("");
    setNewCourse("");
    setNewPrice("");
  };

  const deleteUser = (id: any) => {
    setUsers(users.filter(user => user.id !== id))
  }

  return (
     <View style={styles.container}>
      <Text style={styles.header} > Chef Christoffel's Dishes </Text>

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
          placeholder="Enter description of the dish"
          value={newDescription}
          onChangeText={setNewDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Select course"
          value={newCourse}
          onChangeText={setNewCourse}
          />
        <TextInput
          style={styles.input}
          placeholder="Enter price"
          value={newPrice}
          onChangeText={setNewPrice}
          keyboardType="numeric"
        />
        <Button title="Add Dish" onPress={addUser} />
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
    backgroundColor: 'rgba(81, 148, 109, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black"
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#333",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  item: {
    backgroundColor: "#f4f8f8ff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
  },
  dishname: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
  },
  course: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
  },

  deletebutton:{
    backgroundColor: "#333",
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

