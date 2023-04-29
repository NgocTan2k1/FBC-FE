import NodeRSA from 'node-rsa';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetProviders, GetPublicKey, GetStocks, SendQuestion } from '~/services/chat';

const initYear = {
    min: 2010,
    max: 2021,
};

export const useChat = ({ ...param }) => {
    const [hideLogout, setHideLogout] = useState(true);
    const [providers, setProviders] = useState([]);
    const [stocks, setStocks] = useState([]);
    const [dataQA, setDataQA] = useState(JSON.parse(localStorage.getItem('datachat')) || []);
    const [hideGuide, setHideGuide] = useState(true);
    // param for search
    const [year, setYear] = useState(initYear);
    const [providerChoice, setProviderChoice] = useState([]);
    const [stockChoice, setStockChoice] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const inputRef = useRef();
    const navigate = useNavigate();

    const handleConfirmLogout = () => {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('key');
        localStorage.removeItem('datachat');
        navigate('/');
    };

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

    const handleKeyDown = async (event) => {
        if (event.shiftKey && event.keyCode === 13) {
        } else if (event.keyCode === 13) {
            event.preventDefault();
            await handleSendQuestion();
        }
    };

    async function handleSendQuestion() {
        try {
            setLoading(true);
            const expireDate = new Date(Date.parse(JSON.parse(localStorage.getItem('key'))?.expire));
            const currentDate = new Date();
            if (expireDate.getTime() <= currentDate.getTime()) {
                const fetchData = async () => {
                    const key = await GetPublicKey();
                    console.log('=== đang lấy key ===');
                    localStorage.setItem(
                        'key',
                        JSON.stringify({
                            public: key.data.public_key,
                            expire: key.data.expire,
                            private: key.data.private_key,
                        }),
                    );
                };
                await fetchData();
            }

            if (message) {
                const publicKey = new NodeRSA();
                const pub = JSON.parse(localStorage.getItem('key')).public;
                publicKey.importKey(pub, 'pkcs8-public');
                const encrypt = publicKey.encrypt(message.trim(), 'base64');
                const dataSend = {
                    message: encrypt,
                    provider_id: providerChoice,
                    stock_id: stockChoice,
                    year: `${year.min},${year.max}`,
                };
                await SendQuestion(dataSend).then((respone) => {
                    let dataQuestionsAndAnswers = dataQA;
                    dataQuestionsAndAnswers.push({
                        question: message,
                        answer: respone.data.data,
                    });
                    setDataQA(dataQuestionsAndAnswers);
                    localStorage.setItem('datachat', JSON.stringify(dataQA));
                });
            }
            setMessage('');
            inputRef.current.focus();
            setLoading(false);
        } catch (error) {
            console.log(error);
            setMessage('');
        }
    }

    const onLogoutHandler = () => {};
    return {
        hideLogout,
        setHideLogout,
        onLogoutHandler,
        hideGuide,
        setHideGuide,
        providers,
        stocks,
        fetchProviders,
        fetchStocks,
        year,
        setYear,
        message,
        setMessage,
        loading,
        setLoading,
        handleKeyDown,
        handleSendQuestion,
        dataQA,
        handleConfirmLogout,
        providerChoice,
        setProviderChoice,
        stockChoice,
        setStockChoice,
    };
};
