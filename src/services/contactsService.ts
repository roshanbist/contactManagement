import ContactModel, { ContactDocument } from '../model/ContactModel';
import { Forbidden, NotFound } from '../utils/CustomError';

const getAllContacts = async (
  id: string
): Promise<ContactDocument[] | null> => {
  return await ContactModel.find({ user_id: id });
};

const getContactById = async (
  id: string,
  loggedId: string
): Promise<ContactDocument> => {
  const contact = await ContactModel.findById(id);

  if (!contact) {
    throw new NotFound(`Contact with that id not found`);
  }

  if (contact.user_id.toString() !== loggedId) {
    throw new Forbidden('You are not authorized to view this contact');
  }

  return contact;
};

const createContact = async (
  contact: ContactDocument
): Promise<ContactDocument> => {
  return await contact.save();
};

const updateContact = async (
  id: string,
  contact: Partial<ContactDocument>,
  loggedId: string
): Promise<ContactDocument> => {
  const updatedContact = await ContactModel.findByIdAndUpdate(id, contact, {
    new: true,
  });

  if (!updatedContact) {
    throw new NotFound(`No matched contact found`);
  }

  if (loggedId !== updatedContact.user_id.toString()) {
    throw new Forbidden('You are not authorized to update this contact');
  }

  return updatedContact;
};

const deleteContact = async (id: string, loggedId: string) => {
  const contact = await ContactModel.findByIdAndDelete(id);

  if (!contact) {
    throw new NotFound(`No matched contact found`);
  }

  if (contact.user_id.toString() !== loggedId) {
    throw new Forbidden('You are not authorized to delete this contact');
  }

  return contact;
};

export default {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
