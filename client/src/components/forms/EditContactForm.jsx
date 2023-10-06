import React, { useEffect } from 'react';
import axios from 'axios';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/style.css';
import ContactForm from './ContactForm';

const EditContactForm = () => {
    const methods = useForm();
    const navigate = useNavigate();
    const { phoneId } = useParams();

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/contact/${phoneId}`);

                methods.setValue("nome", response.data.contato.nome);
                methods.setValue("idade", response.data.contato.idade);
                methods.setValue("telefone", response.data.numero);

            } catch (error) {
                console.log(error);
            }
        };

        fetchContact();
    }, [phoneId, methods.setValue]);

    const onSubmit = async (data) => {
        try {
            await axios.put(`http://localhost:8080/contact/${phoneId}`, data);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='contact-list'>
            <h1>Editar Contato</h1>
            <FormProvider {...methods}>
                <ContactForm onSubmit={onSubmit} buttonLabel="Salvar" buttonStyle="btn btn-primary"></ContactForm>
            </FormProvider>
        </div>
    );
}

export default EditContactForm;
