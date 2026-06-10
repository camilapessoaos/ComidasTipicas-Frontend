
const API_URL = 'http://192.168.1.78:3000/api';

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensagem || 'Erro na requisição');
  }

  return data;
}

export function listarComidas() {
  return request('/comidas');
}

export function criarComida(comida) {
  return request('/comidas', {
    method: 'POST',
    body: JSON.stringify(comida),
  });
}

export function atualizarComida(id, comida) {
  return request(`/comidas/${id}`, {
    method: 'PUT',
    body: JSON.stringify(comida),
  });
}

export function deletarComida(id) {
  return request(`/comidas/${id}`, {
    method: 'DELETE',
  });
}
