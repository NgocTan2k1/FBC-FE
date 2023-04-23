import { useState } from "react";
import { GetProviders, GetStocks } from "~/services/chat";

const initYear = {
    min: 2010,
    max: 2021,
}

export const useChat = ({ ...param }) => {
    const [providers, setProviders] = useState([]);
    const [stocks, setStocks] = useState([]);
    const [year, setYear] = useState(initYear);
    const fetchProviders = async () => {
        try {
            const results = await GetProviders();
            setProviders(results.data.results);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchStocks = async () => {
        try {
            const results = await GetStocks();
            setStocks(results.data.results);
        } catch (error) {
            console.log(error);
        }
    };

    const onLogoutHandler = () => { };
    const onSubmitHandler = () => { };
    return {
        onLogoutHandler,
        providers,
        stocks,
        fetchProviders,
        fetchStocks,
        year,
        setYear,
    }
}
