import axios from 'axios';

const API_URL = 'https://localhost:7229/api/beneficiarios';

export const buscarBeneficiarios = async (page = 1, pageSize = 10) => {
  const response = await axios.get(API_URL, {
    params: {
      page,
      pageSize,
    },
    headers: {
      Accept: 'application/json'
    }
  });

  return response.data; 
};

export const buscarPontuacao = async (id) => {
  const response = await axios.get(`${API_URL}/${id}/pontuacao`);
  return response.data;
};

export const criarBeneficiario = async (beneficiario, carteirinha) => {
  const response = await axios.post(`${API_URL}?carteirinha=${carteirinha}`, beneficiario);
  return response.data;
};

export const atualizarBeneficiario = async (id, beneficiario) => {
  const response = await axios.put(`${API_URL}/${id}`, beneficiario);
  return response.data;
};

export const deletarBeneficiario = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
