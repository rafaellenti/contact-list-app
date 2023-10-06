import React from 'react';
import axios from 'axios';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import '../../styles/style.css';
import ContactForm from './ContactForm';

const AddContactForm = () => {
    const methods = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            await axios.post("http://localhost:8080/contacts", data);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='contact-list'>
            <h1>Adicionar Contato</h1>

            <FormProvider {...methods}>
                <ContactForm onSubmit={onSubmit} buttonLabel="Adicionar" buttonStyle="btn btn-success"></ContactForm>
            </FormProvider>
        </div>
    );
}

export default AddContactForm;
