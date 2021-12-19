import axios from "axios";
import apiAuth from "../apiHelper/apiAuth";
const apiUrl = process.env.REACT_APP_API_URL;

export const getCompaniesFromApi = async () => {
    const response = await axios.get(`${apiUrl}/auth`);
    return response;
};

export const getSingleCompanyFromApi = async (id) => {
    const response = await axios.get(`${apiUrl}/auth/company/signup/${id}`);
    return response;
};

export const signupCompany = async (company) => {
    try {
        const response = await axios.post(`${apiUrl}/auth/signup/`, company);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const loginCompanyToApi = async (company) => {
    const response = await apiAuth.post(`${apiUrl}/auth/login`, company);
    try {
        if (response.data.usser) {
            localStorage.setItem("jwtchargeit", JSON.stringify(response.data));
        }
    } catch (error) {
        console.log(error.response);
    }
    return response;
};

export const updateCompanyToApi = async (id, company) => {
    const response = await apiAuth.put(`${apiUrl}/auth/company/${id}`, company);
    try {
        if (response.data.company) {
            localStorage.setItem("jwtchargeit", JSON.stringify(response.data));
        }
    } catch (error) {
        console.log(error)
    }
    return response;
};

export const deleteCompanyFromApi = async (id) => {
    const response = await apiAuth.delete(`${apiUrl}/auth/company/${id}`);
    return response;
};

export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem("jwtchargeit")) {
        return JSON.parse(localStorage.getItem("jwtchargeit"));
    }
    return false;
}

export const logOut = async () => {
    await localStorage.removeItem("jwtchargeit");
};