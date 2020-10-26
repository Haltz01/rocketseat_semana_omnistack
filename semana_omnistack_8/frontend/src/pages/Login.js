import React, { useState } from 'react'; // necessário importar o React em todos os componentes da página
import './Login.css';

import api from '../services/api';

import logo from '../assets/logo.svg';

export default function Login({ history }) { // essa função/componente será exportada
    const [username, setUsername] = useState(''); // useState retorna o username e a função setUsername -> criando um estado
    
    async function handleSubmit(e) { // função disparada ao executar um submit
        e.preventDefault(); // previne comportamento padrão do formulário (redirecionamento)!!

        const response = await api.post('/devs', {
            username: username,
        }); // o começo da rota está definido em outro arquivo

        const { _id } = response.data;

        history.push(`/dev/${_id}`); // a propriedade history permite executar várias funções - como push = redirecionamento
    }

    return (
        <div className="login-container">
            {/*  É possível usar 'class' mas essa é palavra reservada do js */}
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="TinDev Logo" />
                <input 
                    placeholder="Digite seu usuário no Github" 
                    value={username}
                    onChange={e => setUsername(e.target.value)} // valor digitado dentro do input é passado para função setUsername
                />
                <button type="submit"> Enviar </button>
            </form>
        </div>
    );
}