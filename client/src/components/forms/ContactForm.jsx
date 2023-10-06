import React from 'react';
import { useFormContext } from 'react-hook-form';
import '../../styles/style.css';

const ContactForm = ({ onSubmit, buttonLabel, buttonStyle }) => {
    const { register, handleSubmit, formState: { errors } } = useFormContext();
    const phoneRegex = /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="contact-form">
                <input type="text" placeholder='Nome' {...register("nome", { required: true })} />
                <input type="number" placeholder='Idade' maxLength="3" {...register("idade", { required: true, min: 1 })} />
                <input type="text" placeholder='Telefone' maxLength="11" {...register("telefone", { required: true, pattern: phoneRegex })} />

                <div className='form-errors'>
                    {errors.nome && <p>Nome obrigatório.</p>}
                    {errors.idade?.type === "required" && <p>Idade obrigatório.</p>}
                    {errors.idade?.type === "min" && <p>Idade deve ser maior que 0.</p>}
                    {errors.telefone && <p>Telefone inválido.</p>}
                </div>

                <button type="submit" className={buttonStyle}>{buttonLabel}</button>
            </div>
        </form>
    )
}

export default ContactForm;