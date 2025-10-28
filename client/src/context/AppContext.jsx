import React, { useEffect, useContext, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from '../api/axios'

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();

    const value = { currency, navigate };

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>

}

export const useAppContext = () => {
    return useContext(AppContext);
}