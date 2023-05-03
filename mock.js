// Importa a função que será mockada
import { getUserData } from './api';
import { getPublicApiData } from './api';
import fetch from 'node-fetch';


// Cria o mock da função fetch
jest.mock('node-fetch');

// Cria o mock da função getUserData
const mockGetUserData = jest.fn();


// Define o comportamento do mock
mockGetUserData.mockReturnValue({
  name: 'Fernanda Mattos',
  email: 'fernanda.mattos@example.com',
});

// Usa o mock no teste
test('getUserData function returns mocked data', () => {
  expect(getUserData()).toEqual({
    name: 'Fernanda Mattos',
    email: 'fernanda.mattos@example.com',
  });
});

// Define o comportamento do mock para simular a resposta da API
const mockApiResponse = { id: 1, title: 'Tarefa 1', completed: false };
fetch.mockResolvedValue({
  ok: true,
  json: () => mockApiResponse,
});

async function getPublicApiData(apiUrl) {
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error('Erro na chamada à API');
  }
  const data = await response.json();
  return data;
}


// Teste da função getPublicApiData
getPublicApiData('https://jsonplaceholder.typicode.com/todos/1')
  .then(data => console.log(data))
  .catch(error => console.error(error));

describe('getPublicApiData', () => {
  it('retorna os dados da API pública', async () => {
    const apiUrl = 'https://jsonplaceholder.typicode.com/todos/1';
    const data = await getPublicApiData(apiUrl);
    expect(data).toEqual(mockApiResponse);
  });

  it('lança um erro quando há um erro na chamada à API', async () => {
    const apiUrl = 'https://jsonplaceholder.typicode.com/todos/2';
    fetch.mockResolvedValue({ ok: false });
    await expect(getPublicApiData(apiUrl)).rejects.toThrow('Erro na chamada à API');
  });
});


