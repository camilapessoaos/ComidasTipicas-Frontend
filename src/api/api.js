import axios from 'axios';

// troca pelo IP da sua máquina local (não use localhost em dispositivo físico)
const api = axios.create({
  baseURL: 'http://SEU_IP:3000',
});

export const listarComidas     = ()         => api.get('/comidas');
export const buscarComidaPorId = (id)       => api.get(`/comidas/${id}`);
export const criarComida       = (dados)    => api.post('/comidas', dados);
export const atualizarComida   = (id, dados)=> api.put(`/comidas/${id}`, dados);
export const deletarComida     = (id)       => api.delete(`/comidas/${id}`);