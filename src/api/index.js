import axios from "axios";
import config from "../config/config.js";

const BASE_URL = "https://api-ssl.bitly.com/v4";

export default new (class Config {
    constructor() {
        this.axios = null;
    }

    async setup() {
        this.axios = axios.create({
            baseURL: BASE_URL,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${config.bitLyApiToken}`,
                'Connection': 'keep-alive'
            },
        });
    }
})();