import axios from "axios";

const client = axios.create({
    baseURL: "https://cvtapi.bsite.net/Folder"
});

export { client };
