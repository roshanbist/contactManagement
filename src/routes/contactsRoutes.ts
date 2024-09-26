import express from 'express';

import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../controllers/contactsController';
import { passportAuthenticate } from '../utils/AuthUtil';

const router = express.Router();

router.get('/', passportAuthenticate(), getAllContacts);
router.get('/:id', passportAuthenticate(), getContactById);
router.post('/', passportAuthenticate(), createContact);
router.put('/:id', passportAuthenticate(), updateContact);
router.delete('/:id', passportAuthenticate(), deleteContact);

export default router;
