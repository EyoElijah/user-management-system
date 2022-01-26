import express from 'express';
const router = express.Router();

import {
  allUser,
  findUser,
  userForm,
  createUser,
  editUser,
  updateUser,
  deleteUser,
  viewUser,
} from '../controllers/userController.js';

router.get('/', allUser);

router.post('/', findUser);

router.get('/adduser', userForm);

router.post('/adduser', createUser);

router.get('/editUser/:id', editUser);

router.post('/editUser/:id', updateUser);

router.get('/viewUser/:id', viewUser);

router.get('/delete/:id', deleteUser);
export default router;
