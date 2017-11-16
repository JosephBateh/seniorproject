import axios from "axios";

export function serverAuth() {
    return axios({
        method: "GET",
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: "/"
    })
        .then(response => {
            return response.data.Address;
        })
        .catch(err => {
            console.log(err);
        });
}

export function getRuleAttributes() {
    return axios({
        method: "GET",
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: "/attributes"
    })
        .then(response => {
            return response.data.Attributes;
        })
        .catch(err => {
            console.log(err);
        });
}

export function saveSmartPlaylist(data) {
    return axios({
        method: "POST",
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: "/smartplaylist",
        data: data
    }).catch(err => {
        console.log(err);
    });
}
