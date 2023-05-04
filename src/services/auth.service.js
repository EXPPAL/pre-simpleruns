import axios from "axios";

class AuthService {
    login(username, password) {
        return axios
            .post(process.env.API_URL + "signin", { username, password })
            .then((response) => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password) {
        return axios.post(process.env.API_URL + "signup", {
            username,
            email,
            password,
        });
    }
}

export default new AuthService();