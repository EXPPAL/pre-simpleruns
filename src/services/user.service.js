import axios from 'axios';
import authHeader from './auth-header';

class UserService {
    getPublicContent() {
        return axios.get(process.env.API_URL + 'all');
    }

    getUserBoard() {
        return axios.get(process.env.API_URL + 'user', { headers: authHeader() });
    }

    getModeratorBoard() {
        return axios.get(process.env.API_URL + 'mod', { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(process.env.API_URL + 'admin', { headers: authHeader() });
    }
}

export default new UserService();