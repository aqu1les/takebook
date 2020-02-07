import axios from "axios";

export async function getInfoByCEP(cep) {
    const reqCEP = cep.replace('-', '');
    const response = await axios.get(`https://viacep.com.br/ws/${reqCEP}/json`);
    return response.data;
}

