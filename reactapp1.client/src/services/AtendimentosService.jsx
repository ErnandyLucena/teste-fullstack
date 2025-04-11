import axios from 'axios';

const API_URL = 'https://localhost:7229/api/atendimentos';

export const buscarAtendimentos = async (page = 1, pageSize = 10) => {
  const response = await axios.get(API_URL, {
    params: { page, pageSize },
    headers: {
      Accept: 'application/json',
    },
  });

  return response.data; 
};

export const criarAtendimento = async (atendimento) => {
  const response = await axios.post(API_URL, atendimento);
  return response.data;
};

export const deletarAtendimento = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
