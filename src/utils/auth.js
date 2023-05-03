import { GetPublicKey } from "~/services/chat";

export const isLogin = () => {
    return localStorage.getItem('userInfo');
};

export const checkExpireKey = () => {

}
export const checkExpireToken = async () => {
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
}

