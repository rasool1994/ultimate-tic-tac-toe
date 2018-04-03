import axios from 'axios';
import config from '../../../env'

export const HTTP = axios.create({
    baseURL: config.baseUrl,
});