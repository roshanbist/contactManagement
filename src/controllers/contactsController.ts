import { NextFunction, Request, Response } from 'express';

import ContactModel, { ContactDocument } from '../model/ContactModel';
import contactsService from '../services/contactsService';
import { asyncErrorHandler } from '../utils/asyncErrorHandler';
import { BadRequest, Forbidden, NotFound } from '../utils/CustomError';
import { UserDocument } from '../model/UserModel';

export const loggedUserPayload = (req: Request) => {
  const userPayload = req.user as UserDocument | undefined;

  if (!userPayload) {
    throw new Forbidden('Please login, no such user found');
  }

  return userPayload;
};

// @desc Get all contacts
// @route GET /api/v1/contacts
// @access private
export const getAllContacts = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const loggedId = (loggedUserPayload(req)._id as string).toString();
    const contacts: ContactDocument[] | null =
      await contactsService.getAllContacts(loggedId);

    res.status(200).json(contacts);
  }
);

// @desc create a new contact
// @route POST /api/v1/contacts
// @access private
export const createContact = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const loggedUser = loggedUserPayload(req);

    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      throw new BadRequest('Incomplete contact data');
    }

    const contactData: ContactDocument = new ContactModel({
      ...req.body,
      user_id: loggedUser._id,
    });

    const newContact: ContactDocument = await contactsService.createContact(
      contactData
    );

    return res.status(201).json(newContact);
  }
);

// @desc Get single contact by id
// @route GET /api/v1/contacts/:id
// @access private
export const getContactById = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const loggedId = (loggedUserPayload(req)._id as string).toString();

    const id = req.params.id;

    const contactList = await contactsService.getAllContacts(loggedId);

    if (!contactList || contactList.length === 0) {
      return next(
        new NotFound('No contacts found. Please create a contact first.')
      );
    }

    if (
      !contactList.some((contact) => (contact?._id as string).toString() === id)
    ) {
      return next(
        new NotFound(
          'Matching Contact with this id not found in your contact list. Please try again.'
        )
      );
    }
    const singleContact: ContactDocument = await contactsService.getContactById(
      id
    );

    res.status(200).json(singleContact);
  }
);

// @desc Update contact by id
// @route PUT /api/v1/contact/:id
// @access private
export const updateContact = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const loggedId = (loggedUserPayload(req)._id as string).toString();

    const id = req.params.id;

    const contactList = await contactsService.getAllContacts(loggedId);

    if (!contactList || contactList.length === 0) {
      return next(
        new NotFound('No contacts found. Please create a contact first.')
      );
    }

    if (
      !contactList.some((contact) => (contact?._id as string).toString() === id)
    ) {
      return next(
        new NotFound(
          'Matching Contact with this id not found in your contact list. Please try again.'
        )
      );
    }

    const contactData: Partial<ContactDocument> = req.body;
    const updatedContact = await contactsService.updateContact(id, contactData);

    res.status(200).json(updatedContact);
  }
);

// @desc Delete contact by id
// @route DELETE /api/v1/contact/:id
// @access private
export const deleteContact = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const loggedId = (loggedUserPayload(req)._id as string).toString();

    const contactList = await contactsService.getAllContacts(loggedId);

    console.log('contact list', contactList);

    if (!contactList || contactList.length === 0) {
      return next(
        new NotFound('No contacts found. Please create a contact first.')
      );
    }

    if (
      !contactList.some(
        (contact) => (contact?._id as string).toString() === req.params.id
      )
    ) {
      return next(
        new NotFound(
          'Matching Contact with this id not found in your contact list. Please try again.'
        )
      );
    }

    await contactsService.deleteContact(req.params.id);
    res.sendStatus(204);
  }
);
