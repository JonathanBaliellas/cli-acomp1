import React, { useState } from "react";
import "./ClienteCadastrarStyles.css";

function ClienteCadastrarView() {
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [cep, setCep] = useState("");
  const [email, setEmail] = useState("");

  const handleConfirm = (e) => {
    e.preventDefault(); // Evita o comportamento padrão do formulário

    const clienteData = {
      cpf,
      nome,
      cep,
      email,
    };

    console.log(JSON.stringify(clienteData, null, 2));
  };

  return (
    <div className="cliente-cadastrar-view">
      <h1 className="title">Cadastrar Cliente</h1>
      <form onSubmit={handleConfirm}>
        <div>
          <label htmlFor="cpf">CPF:</label>
          <input
            data-testid="cpf"
            type="text"
            value={cpf}
            required
            onChange={(e) => setCpf(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input
            data-testid="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="cep">CEP:</label>
          <input
            data-testid="cep"
            type="text"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            data-testid="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="button">
          Confirmar OK
        </button>
      </form>
    </div>
  );
}

export default ClienteCadastrarView;
