const express = require('express');
const router = express.Router();
const { getAllContacts, getContactByPhoneId, addContact, updateContact, deleteContact } = require('./controllers/contactController');

router.get("/", (req, res) => res.json("Backend Here"));
router.get("/contacts", getAllContacts);
router.get("/contact/:phoneId", getContactByPhoneId);
router.post("/contacts", addContact);
router.put("/contact/:phoneId", updateContact);
router.delete("/contacts/:id", deleteContact);

module.exports = router;
