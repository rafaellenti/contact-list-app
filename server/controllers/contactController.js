const prisma = require('../db');
const fs = require('fs')

exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await prisma.contato.findMany({
            include: {
                telefone: true,
            },
        });

        res.setHeader('Content-Type', 'application/json');
        res.json(contacts);
    } catch (error) {
        console.log(error);
    }
};

exports.getContactByPhoneId = async (req, res) => {
    const phoneId = Number(req.params.phoneId);
    try {
        const phone = await prisma.telefone.findUnique({
            where: { id: phoneId },
            include: { contato: true },
        });

        res.json(phone);
    } catch (error) {
        console.log(error);
    }
};

exports.addContact = async (req, res) => {
    const { nome, idade, telefone } = req.body;
    try {
        const newContact = await prisma.contato.create({
            data: {
                nome,
                idade: Number(idade),
                telefone: {
                    create: {
                        numero: telefone,
                    },
                },
            },
        });
        res.json(newContact);
    } catch (error) {
        console.log(error);
    }
};

exports.updateContact = async (req, res) => {
    const phoneId = Number(req.params.phoneId);
    const { nome, idade, telefone } = req.body;
    try {
        const updatedContact = await prisma.telefone.update({
            where: { id: phoneId },
            data: {
                numero: telefone,
                contato: {
                    update: {
                        nome: nome,
                        idade: Number(idade),
                    }
                },
            },
        });
        res.json(updatedContact);
    } catch (error) {
        console.log(error);
    }
};

exports.deleteContact = async (req, res) => {
    const contactId = Number(req.params.id);
    try {
        await prisma.telefone.deleteMany({
            where: { idContato: contactId },
        });
        await prisma.contato.delete({
            where: { id: contactId },
        });

        const logData = `Deleted contact with ID: ${req.params.id} at ${new Date().toISOString()}\n`;
        fs.appendFile('deletion_log.txt', logData, (error) => {
            if (error) {
                console.error('Failed to write to log:', error);
            }
        });

        res.json("Contact deleted successfully.");
    } catch (error) {
        console.log(error);
    }
};
