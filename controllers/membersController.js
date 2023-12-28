
// const Member = require('../models/member');
// const Corona = require('../models/corona');
const axios = require('axios'); 


// const authenticate = (req, res, next) => {
//   // Your authentication logic goes here
//   // For simplicity, let's assume there's a token in the request header
//   const token = req.header('Authorization');

//   if (!token || !validateToken(token)) {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }

//   next();
// };

// // Validate token (dummy function for illustration)
// const validateToken = (token) => {
//   // Implement your token validation logic here
//   return token === 'your_secret_token';
// };


exports.getUsers = async (req, res) => {
  try {
    const page = req.params.page;
    const response = await axios.get(`https://reqres.in/api/users?page=${page}`);

    const users = response.data.data;
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error getUsers' });
  }

};

exports.getById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const response = await axios.get(`https://reqres.in/api/users/${userId}`);
    const user = response.data.data;
    res.status(200).json(user);
  } 
  catch (error) {
    console.error(error);
    res.status(404).json({ error: 'User not found' });
  }
};

exports.createUser = async (req, res) => {
  try {
    // Validate the request body
    if (!req.body.name || !req.body.job) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    // Create a new user using ReqRes API
    const response = await axios.post('https://reqres.in/api/users', req.body);
    const createdUser = response.data;

    res.status(201).json(createdUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error createUser' });
  }
};

exports.updateUser = async  (req, res) => {
  try {

    const userId = req.params.userId;
    // Check if the user exists in the external API
    const userExists = await doesUserExist(userId);
    // Check if the user exists in your cache

    if (!userExists) {
      return res.status(404).json({ error: 'User not found ' });
    }


    // Update the user using ReqRes API
    const response = await axios.put(`https://reqres.in/api/users/${userId}`, req.body);
    const updatedUserData = response.data;

    // Update the user in your data store
    // if (existingUser) {
    //   existingUser.name = updatedUserData.name;
    //   existingUser.job = updatedUserData.job;
    // } else {
    //   // If not found in the local data store, add it
    //   users.push(updatedUserData);
    // }

    res.status(200).json(updatedUserData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error updateUser' });
  }
};

exports.deleteUser = async  (req, res) => {
  try {

    const userId = req.params.userId;
    
    // const existingUser = users.find(user => user.id === userId);
    // Check if the user exists in the external API
    const userExists = await doesUserExist(userId);
    // Check if the user exists in your cache

    if (!userExists) {
      return res.status(404).json({ error: 'User not found' });
    }


    // Update the user using ReqRes API
    const response = await axios.delete(`https://reqres.in/api/users/${userId}`);

    // Update the user in your data store
    // if (existingUser) {
    //   existingUser.name = updatedUserData.name;
    //   existingUser.job = updatedUserData.job;
    // } else {
    //   // If not found in the local data store, add it
    //   users.push(updatedUserData);
    // }

    res.status(200).json({userId});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error deleteUser' });
  }
};
const doesUserExist = async (userId) => {
  try {
    const response = await axios.get(`https://reqres.in/api/users/${userId}`);
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

