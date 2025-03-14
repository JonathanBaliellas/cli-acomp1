import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import ClienteCadastrarView from "./componentes/cliente_cadastrar/ClienteCadastrarView";

test("ct01 - verifica se titulo esta na pagina", () => {
  render(<App />); //Chama o app
  const textElement = screen.getByText(/cadastrar cliente/i); //Verifica que há o texto "cadastrar cliente" renderizado na tela. O "/i" faz com que seja desconsiderado maiúsc/minusc
  expect(textElement).toBeInTheDocument(); //Espera que o elemento esteja no documento
});

test("ct02 - verifica o comportamento do botao confirma", () => {
  render(<ClienteCadastrarView />);

  // Captura os elementos do formulário
  const cpfInput = screen.getByTestId("cpf");
  const nomeInput = screen.getByTestId("nome");
  const cepInput = screen.getByTestId("cep");
  const emailInput = screen.getByTestId("email");
  const submitButton = screen.getByRole("button", { name: /confirmar ok/i });

  // Simula o preenchimento dos campos
  fireEvent.change(cpfInput, { target: { value: "12345678900" } });
  fireEvent.change(nomeInput, { target: { value: "João Silva" } });
  fireEvent.change(cepInput, { target: { value: "01010101" } });
  fireEvent.change(emailInput, { target: { value: "joao@email.com" } });

  // Simula o evento submit
  fireEvent.submit(submitButton);

  // Verifica se os campos mantêm os valores após o submit
  expect(cpfInput).toHaveValue("12345678900");
  expect(nomeInput).toHaveValue("João Silva");
  expect(cepInput).toHaveValue("01010101");
  expect(emailInput).toHaveValue("joao@email.com");
  console.log(screen.debug());
});

test("ct03 - deve exibir os dados corretos no console ao submeter o formulário", () => {
  // Captura o console original
  const originalConsoleLog = console.log;
  let logOutput = "";

  // Sobrescreve console.log para capturar a saída
  console.log = (message) => {
    logOutput = message;
  };

  render(<ClienteCadastrarView />);

  // Captura os elementos do formulário
  fireEvent.change(screen.getByTestId("cpf"), { target: { value: "12345678900" } });
  fireEvent.change(screen.getByTestId("nome"), { target: { value: "João Silva" } });
  fireEvent.change(screen.getByTestId("cep"), { target: { value: "01010101" } });
  fireEvent.change(screen.getByTestId("email"), { target: { value: "joao@email.com" } });

  // Simula o envio do formulário
  fireEvent.submit(screen.getByRole("button", { name: /confirmar/i }));

  // Dados esperados no console
  const expectedOutput = JSON.stringify(
    {
      cpf: "12345678900",
      nome: "João Silva",
      cep: "01010101",
      email: "joao@email.com",
    },
    null,
    2
  );

  // Valida se o console.log exibiu os dados corretamente
  expect(logOutput).toBe(expectedOutput);

  // Restaura o console.log original
  console.log = originalConsoleLog;
});