import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/style.css';
import 'bootstrap/dist/css/bootstrap.css';

const Contacts = () => {
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        const fetchAllContacts = async () => {
            try {
                const response = await axios.get("http://localhost:8080/contacts");
                const auxContact = response.data.reduce((cumulator, { telefone, ...rest }) => {
                    return [...cumulator, ...telefone.map(t => ({ ...rest, telefone: t }))];
                }, []);
                setContacts(auxContact);
            } catch (error) { console.log(error); }
        }

        fetchAllContacts();
    }, [])

    const filteredContacts = useMemo(() => {
        return contacts.filter(contact => contact.nome.toLowerCase().includes(searchInput.toLowerCase()) || contact.telefone.numero.includes(searchInput));
    }, [searchInput, contacts])

    const handleDelete = async (contactId) => {
        try {
            await axios.delete("http://localhost:8080/contacts/" + contactId);

            const newContacts = contacts.filter(contact => contact.id !== contactId);
            setContacts(newContacts);
        } catch (error) {
            console.log("Erro na chamada do botao");
        }
    }

    const handleCreate = () => {
        navigate('/add');
    }

    const handleEdit = (phoneId) => {
        navigate('/edit/' + phoneId);
    }

    const handleFilterChange = (event) => {
        setSearchInput(event.target.value);
    }

    return (
        <div className='contact-list scroll-list'>
            <h1 className='mb-4'>Lista de Contatos</h1>
            <input className="search-bar" type="text" placeholder="Buscar contato" value={searchInput} onChange={handleFilterChange}></input>
            <table className='table'>
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Idade</th>
                        <th scope="col">Telefone</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredContacts.map((contact) => (
                        <tr key={contact.id}>
                            <td>{contact.nome}</td>
                            <td>{contact.idade}</td>
                            <td>{contact.telefone.numero}</td>
                            <td>
                                <button className='btn btn-primary edit-button' onClick={() => handleEdit(contact.telefone.id)}>Editar</button>
                                <button className='btn btn-danger' onClick={() => handleDelete(contact.id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={handleCreate} className='btn btn-success'>Adicionar Contato</button>
        </div>
    )
}

export default Contacts;