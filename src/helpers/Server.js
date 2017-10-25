import axios from "axios";

export function serverAuth() {
    return axios({
        method: "GET",
        baseURL: "http://localhost:8080",
        url: "/"
    })
        .then(response => {
            return response.data.address;
        })
        .catch(err => {
            console.log(err);
        });
}
