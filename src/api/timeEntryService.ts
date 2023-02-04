//GET Projects

//POST Start Clock

//PUT Stop Timer

// DELETE Discard Entry

import axios, { axiosPrivate } from "./axios";
import { User } from "../types/user.type";

// register
const newEntry = async (project : string) => {
    const response = await axiosPrivate.post('time/entry' , {project})


    return response;
}

// login
const login = async (userData: User) =>
{
    const response = await axios.post('/login', userData, 
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        })
    
    return response;
}

// logout
const logout = async () => {
    const response = await axios.post('/logout',null,
        {
            withCredentials: true
        })
}

const authService = {
    newEntry,
    logout,
    login
}

export default authService