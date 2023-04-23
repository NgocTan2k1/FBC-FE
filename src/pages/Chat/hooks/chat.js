import { useState } from "react";
import { GetProviders, GetStocks } from "~/services/chat";

const initYear = {
    min: 2010,
    max: 2021,
}

export const useChat = ({ ...param }) => {
    const [providers, setProviders] = useState([]);
    const [stocks, setStocks] = useState([]);
    // param for search
    const [year, setYear] = useState(initYear);
    const [providerChoice, setProviderChoice] = useState([]);
    const [stockChoice, setStockChoice] = useState([]);
    const [message , setMessage] = useState("")


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
