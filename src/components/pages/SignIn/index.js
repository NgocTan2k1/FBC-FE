import { Form, Input } from 'antd';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

import logo from '~/img/logo.png';
import styles from './SignIn.module.scss';
import classNames from 'classnames/bind';
import { SignInApi } from '~/services/auth';
import { GetProviders, GetPublicKey, GetStocks } from '~/services/chat';

const cx = classNames.bind(styles);

console.log('SignIn - re-render - out');
function SignIn() {
    const [form] = Form.useForm();
    const [valueUpdate, setValueUpdate] = useState({});
    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit() {
        setLoading(true);

        if (valueUpdate.password && valueUpdate.username) {
            const data = {
                password: valueUpdate.password,
                username: valueUpdate.username,
            };
            await SignInApi(data)
                .then(async (respone) => {
                    localStorage.setItem(
                        'userInfo',
                        JSON.stringify({
                            access: respone.data.access,
                            refresh: respone.data.refresh,
                        }),
                    );
                    setError(false);

                    const getData = async () => {
                        const key = await GetPublicKey();
                        console.log(key);
                        localStorage.setItem(
                            'key',
                            JSON.stringify({
                                public: key.data.public_key,
                                expire: key.data.expire,
                                private: key.data.private_key,
                            }),
                        );

                        const providers = await GetProviders();
                        localStorage.setItem('providers', JSON.stringify(providers.data.results));
                        console.log(providers);

                        const stocks = await GetStocks();
                        localStorage.setItem('stocks', JSON.stringify(stocks.data.results));
                        console.log(stocks);
                    };

                    await getData();
                    setLoading(false);
                    navigate('/chat');
                })
                .catch((error) => {
                    if (error) {
                        setError(true);
                        console.log(error);
                    }
                });
        } else {
            setError(true);
        }
        setLoading(false);
    }

    function handleSetValueUpdate(value) {
        if (value) {
            setValueUpdate({ ...valueUpdate, ...value });
        }
    }

    console.log('SignIn - re-render - in');
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h1 className={cx('title')}>Sign in</h1>
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <img src={logo} className={cx('logo')}></img>
            </div>
            <div className={cx('container')}>
                <Form form={form} onValuesChange={handleSetValueUpdate} className={cx('container_form')}>
                    <Form.Item name="username" className={cx('container_form_item')}>
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="Enter Email or username"
                            className={cx('container_form_item--input')}
                        />
                    </Form.Item>

                    <Form.Item name="password" className={cx('container_form_item')}>
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="off"
                            placeholder="Password"
                            className={cx('container_form_item--input')}
                        />
                    </Form.Item>
                    <div className={cx('icon')} onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? (
                            <FontAwesomeIcon icon={faEye} className={cx('icon_showpassword')} />
                        ) : (
                            <FontAwesomeIcon icon={faEyeSlash} className={cx('icon_hidepassword')} />
                        )}
                    </div>

                    {error ? <div className={cx('error-signin')}> your username or password is incorrect </div> : ''}

                    <button onClick={handleSubmit} className={cx('signin-btn')}>
                        {loading && <FontAwesomeIcon className={cx('icon-loading-answer')} icon={faSpinner} />}
                        {!loading && `Login`}
                    </button>

                    <Link to="/signup" className={cx('signup-link')}>
                        you don't have account?
                    </Link>
                </Form>
            </div>
        </div>
    );
}

export default SignIn;
// const e = {
//     result: [
//         {
//             provider_id: '1',
//             interest_income: 2288071.0,
//             service_activities: 588838.0,
//             other_activities: -107770.0,
//             profit_after_tax: 1745170.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 2625323.83794,
//             service_activities: 642651.94128,
//             other_activities: 56641.237,
//             profit_after_tax: 1915335.542693,
//         },
//         {
//             provider_id: '1',
//             interest_income: 3089550.626061,
//             service_activities: 732709.326019,
//             other_activities: 276343.900137,
//             profit_after_tax: 2320035.899881,
//         },
//         {
//             provider_id: '1',
//             interest_income: 3021632.514698,
//             service_activities: 738760.315019,
//             other_activities: 614892.950319,
//             profit_after_tax: 2285716.025565,
//         },
//         {
//             provider_id: '1',
//             interest_income: 3174002.914094,
//             service_activities: 950402.026213,
//             other_activities: 341761.027936,
//             profit_after_tax: 2502988.046194,
//         },
//         {
//             provider_id: '1',
//             interest_income: 3220671.0,
//             service_activities: 543838.0,
//             other_activities: 524739.0,
//             profit_after_tax: 2512134.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 3650585.0,
//             service_activities: 682640.0,
//             other_activities: 876819.0,
//             profit_after_tax: 2883551.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 4615726.0,
//             service_activities: 1130676.0,
//             other_activities: 1109074.0,
//             profit_after_tax: 3490415.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 7767373.0,
//             service_activities: 2561310.0,
//             other_activities: 1517079.0,
//             profit_after_tax: 6189901.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 10036119.0,
//             service_activities: 3185837.0,
//             other_activities: 2099398.0,
//             profit_after_tax: 8068604.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 10688276.0,
//             service_activities: 3575553.0,
//             other_activities: 1679550.0,
//             profit_after_tax: 8606039.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 16527259.0,
//             service_activities: 4367378.0,
//             other_activities: 3254314.0,
//             profit_after_tax: 13221437.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 22729320.0,
//             service_activities: 4135568.0,
//             other_activities: 2141658.0,
//             profit_after_tax: 18155185.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 4221113.0,
//             service_activities: 1150354.0,
//             other_activities: 543374.0,
//             profit_after_tax: 3153766.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 1017856.0,
//             service_activities: 565403.0,
//             other_activities: 361615.0,
//             profit_after_tax: 765686.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 878206.0,
//             service_activities: 736243.0,
//             other_activities: 414132.0,
//             profit_after_tax: 659071.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 1417021.0,
//             service_activities: 1122583.0,
//             other_activities: 8447.0,
//             profit_after_tax: 1081858.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 2037205.0,
//             service_activities: 1138975.0,
//             other_activities: 1026426.0,
//             profit_after_tax: 1529188.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 3996640.0,
//             service_activities: 1955764.0,
//             other_activities: 973833.0,
//             profit_after_tax: 3148846.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 8036297.0,
//             service_activities: 3811902.0,
//             other_activities: 1714891.0,
//             profit_after_tax: 6445595.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 10661016.0,
//             service_activities: 3535984.0,
//             other_activities: 1633777.0,
//             profit_after_tax: 8473997.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 12838268.0,
//             service_activities: 3253353.0,
//             other_activities: 1806728.0,
//             profit_after_tax: 10226209.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 15800296.0,
//             service_activities: 4188778.0,
//             other_activities: 2279209.0,
//             profit_after_tax: 12582467.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 23238293.0,
//             service_activities: 6382240.0,
//             other_activities: 1803246.0,
//             profit_after_tax: 18415382.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 25567768.0,
//             service_activities: 8527494.0,
//             other_activities: 2167375.0,
//             profit_after_tax: 20436426.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 6827457.0,
//             service_activities: 1872648.0,
//             other_activities: 1905279.0,
//             profit_after_tax: 5332067.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 8523083.0,
//             service_activities: 2106705.0,
//             other_activities: 1917190.0,
//             profit_after_tax: 6851001.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 11341361.0,
//             service_activities: 2538209.0,
//             other_activities: 2099530.0,
//             profit_after_tax: 9110588.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 18269226.0,
//             service_activities: 3402492.0,
//             other_activities: 3234365.0,
//             profit_after_tax: 14622062.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 23122377.0,
//             service_activities: 4306844.0,
//             other_activities: 3069795.0,
//             profit_after_tax: 18525988.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 23049561.0,
//             service_activities: 6607317.0,
//             other_activities: 1800253.0,
//             profit_after_tax: 18472518.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 27388580.0,
//             service_activities: 7407073.0,
//             other_activities: 2393261.0,
//             profit_after_tax: 21939045.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 37368091.0,
//             service_activities: 6839100.0,
//             other_activities: 2053961.0,
//             profit_after_tax: 29919054.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 2560442.0,
//             service_activities: 1142758.0,
//             other_activities: 135451.0,
//             profit_after_tax: 1910340.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 2770674.0,
//             service_activities: 1041395.0,
//             other_activities: 106076.0,
//             profit_after_tax: 1995857.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 1367851.0,
//             service_activities: 686489.0,
//             other_activities: -81567.0,
//             profit_after_tax: 1002370.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 3102248.0,
//             service_activities: 826440.0,
//             other_activities: 49970.0,
//             profit_after_tax: 2334794.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 4202693.0,
//             service_activities: 825532.0,
//             other_activities: -1181.0,
//             profit_after_tax: 3207841.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 1042676.0,
//             service_activities: 702567.0,
//             other_activities: 1716.0,
//             profit_after_tax: 784040.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 1035560.0,
//             service_activities: 770420.0,
//             other_activities: 31801.0,
//             profit_after_tax: 826493.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 1215401.0,
//             service_activities: 694440.0,
//             other_activities: 49059.0,
//             profit_after_tax: 951802.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 1314151.0,
//             service_activities: 745226.0,
//             other_activities: 242483.0,
//             profit_after_tax: 1028232.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 1667026.0,
//             service_activities: 944382.0,
//             other_activities: 285204.0,
//             profit_after_tax: 1325174.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 2656207.0,
//             service_activities: 1188331.0,
//             other_activities: 891642.0,
//             profit_after_tax: 2118131.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 6388571.0,
//             service_activities: 1497526.0,
//             other_activities: 1814771.0,
//             profit_after_tax: 5137052.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 7515936.0,
//             service_activities: 1896492.0,
//             other_activities: 1500140.0,
//             profit_after_tax: 6009937.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 9595888.0,
//             service_activities: 1694654.0,
//             other_activities: 279650.0,
//             profit_after_tax: 7682823.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 11998112.0,
//             service_activities: 2893963.0,
//             other_activities: 139463.0,
//             profit_after_tax: 9602746.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 17114208.0,
//             service_activities: 3526244.0,
//             other_activities: 989694.0,
//             profit_after_tax: 13688193.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 656733.0,
//             service_activities: 106464.0,
//             other_activities: 37084.0,
//             profit_after_tax: 494329.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 1000962.0,
//             service_activities: 218448.0,
//             other_activities: 75432.0,
//             profit_after_tax: 753029.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 1825203.0,
//             service_activities: 152097.0,
//             other_activities: 689034.0,
//             profit_after_tax: 1687269.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 1000048.0,
//             service_activities: 133131.0,
//             other_activities: 76626.0,
//             profit_after_tax: 849770.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 1012348.0,
//             service_activities: 353599.0,
//             other_activities: 107766.0,
//             profit_after_tax: 790747.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 1017054.0,
//             service_activities: 97438.0,
//             other_activities: 174584.0,
//             profit_after_tax: 795156.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 1156439.0,
//             service_activities: 338065.0,
//             other_activities: 364316.0,
//             profit_after_tax: 913061.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 1925311.0,
//             service_activities: 1456865.0,
//             other_activities: 137492.0,
//             profit_after_tax: 1539128.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 2093853.0,
//             service_activities: 713942.0,
//             other_activities: 130061.0,
//             profit_after_tax: 1672319.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 3026340.0,
//             service_activities: 694106.0,
//             other_activities: 241736.0,
//             profit_after_tax: 2417890.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 3268000.0,
//             service_activities: 522749.0,
//             other_activities: 348570.0,
//             profit_after_tax: 2607012.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 6260042.0,
//             service_activities: 585623.0,
//             other_activities: 861347.0,
//             profit_after_tax: 5007161.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 9689368.0,
//             service_activities: 890554.0,
//             other_activities: 687227.0,
//             profit_after_tax: 7728918.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 5479183.0,
//             service_activities: 1416410.0,
//             other_activities: 579747.0,
//             profit_after_tax: 4235792.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 5697405.0,
//             service_activities: 1509733.0,
//             other_activities: -1260916.0,
//             profit_after_tax: 4217332.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 5764298.0,
//             service_activities: 1373759.0,
//             other_activities: 525098.0,
//             profit_after_tax: 4420993.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 5743076.0,
//             service_activities: 1619371.0,
//             other_activities: 934285.0,
//             profit_after_tax: 4377582.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 5842862.0,
//             service_activities: 1771425.0,
//             other_activities: 1784643.0,
//             profit_after_tax: 4584770.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 2960648.0,
//             service_activities: 947900.0,
//             other_activities: 97078.0,
//             profit_after_tax: 2229106.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 2826287.0,
//             service_activities: 948483.0,
//             other_activities: 133562.0,
//             profit_after_tax: 2206432.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 1469500.156407,
//             service_activities: 1171453.400168,
//             other_activities: 546167.171266,
//             profit_after_tax: 1146257.96947,
//         },
//         {
//             provider_id: '1',
//             interest_income: 155591.0,
//             service_activities: 1430044.0,
//             other_activities: 736964.0,
//             profit_after_tax: 88609.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 1491804.0,
//             service_activities: 2623831.0,
//             other_activities: 315207.0,
//             profit_after_tax: 1181560.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 2246991.0,
//             service_activities: 2682144.0,
//             other_activities: 932383.0,
//             profit_after_tax: 1790156.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 3216746.0,
//             service_activities: 3322990.0,
//             other_activities: 1421187.0,
//             profit_after_tax: 2454864.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 3339280.0,
//             service_activities: 3744015.0,
//             other_activities: 1123732.0,
//             profit_after_tax: 2681981.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 4400026.0,
//             service_activities: 4342519.0,
//             other_activities: 457106.0,
//             profit_after_tax: 3411496.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 6339072.0,
//             service_activities: 5194080.0,
//             other_activities: 2745349.0,
//             profit_after_tax: 5040695.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 1051233.0,
//             service_activities: 231350.0,
//             other_activities: 78710.0,
//             profit_after_tax: 790929.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 848900.0,
//             service_activities: 190997.0,
//             other_activities: -405620.0,
//             profit_after_tax: 638995.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 700763.0,
//             service_activities: 126940.0,
//             other_activities: 129847.0,
//             profit_after_tax: 520389.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 81091.0,
//             service_activities: 164544.0,
//             other_activities: 151902.0,
//             profit_after_tax: 50248.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 648353.0,
//             service_activities: 164949.0,
//             other_activities: 942544.0,
//             profit_after_tax: 522670.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 655144.0,
//             service_activities: 166103.0,
//             other_activities: 320353.0,
//             profit_after_tax: 521066.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 702216.0,
//             service_activities: 255637.0,
//             other_activities: 317281.0,
//             profit_after_tax: 561732.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 1405070.0,
//             service_activities: 406891.0,
//             other_activities: 126763.0,
//             profit_after_tax: 1124279.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 2742570.0,
//             service_activities: 734745.0,
//             other_activities: 515114.0,
//             profit_after_tax: 2193921.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 4082257.0,
//             service_activities: 1797300.0,
//             other_activities: 224362.0,
//             profit_after_tax: 3266402.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 5803007.0,
//             service_activities: 2388675.0,
//             other_activities: 282762.0,
//             profit_after_tax: 4642334.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 8011012.0,
//             service_activities: 2741952.0,
//             other_activities: 220990.0,
//             profit_after_tax: 6409750.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 10581115.0,
//             service_activities: 3188381.0,
//             other_activities: 354882.0,
//             profit_after_tax: 8468767.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 240453.351639,
//             service_activities: 60059.689956,
//             other_activities: 241828.493562,
//             profit_after_tax: 217596.072897,
//         },
//         {
//             provider_id: '1',
//             interest_income: 622216.792646,
//             service_activities: 126340.152306,
//             other_activities: 47023.831267,
//             profit_after_tax: 476876.520473,
//         },
//         {
//             provider_id: '1',
//             interest_income: 788434.0,
//             service_activities: 188107.0,
//             other_activities: 19571.0,
//             profit_after_tax: 630111.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 1147633.0,
//             service_activities: 118224.0,
//             other_activities: 166691.0,
//             profit_after_tax: 914498.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 2416782.0,
//             service_activities: 196433.0,
//             other_activities: 270165.0,
//             profit_after_tax: 1954407.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 4004628.0,
//             service_activities: 438174.0,
//             other_activities: 482996.0,
//             profit_after_tax: 3201511.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 5018413.0,
//             service_activities: 625876.0,
//             other_activities: 438278.0,
//             profit_after_tax: 4020334.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 5818222.0,
//             service_activities: 949983.0,
//             other_activities: 518843.0,
//             profit_after_tax: 4647097.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 8069617.0,
//             service_activities: 1927438.0,
//             other_activities: 182637.0,
//             profit_after_tax: 6453499.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 10268056.0,
//             service_activities: 2956818.0,
//             other_activities: 528090.0,
//             profit_after_tax: 8209470.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 535168.0,
//             service_activities: -306476.0,
//             other_activities: -125076.0,
//             profit_after_tax: 466463.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 421937.0,
//             service_activities: -268219.0,
//             other_activities: -138491.0,
//             profit_after_tax: 349849.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 1347858.0,
//             service_activities: 76065.0,
//             other_activities: -143237.0,
//             profit_after_tax: 1062786.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 1768086.0,
//             service_activities: 64880.0,
//             other_activities: -578634.0,
//             profit_after_tax: 1368086.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 1212941.0,
//             service_activities: 152825.0,
//             other_activities: -291397.0,
//             profit_after_tax: 959953.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 2038824.0,
//             service_activities: 393411.0,
//             other_activities: 37787.0,
//             profit_after_tax: 1600277.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 2426553.0,
//             service_activities: 626801.0,
//             other_activities: 190412.0,
//             profit_after_tax: 1861908.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 3638018.0,
//             service_activities: 857882.0,
//             other_activities: 33702.0,
//             profit_after_tax: 2873248.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 5689681.0,
//             service_activities: 1661862.0,
//             other_activities: 201147.0,
//             profit_after_tax: 4510253.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 4625568.0,
//             service_activities: 1776528.0,
//             other_activities: 387349.0,
//             profit_after_tax: 3760715.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 4219873.0,
//             service_activities: 2157205.0,
//             other_activities: 606603.0,
//             profit_after_tax: 3199608.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 4375633.039839,
//             service_activities: 2141301.310375,
//             other_activities: 616159.490909,
//             profit_after_tax: 3318863.2939,
//         },
//         {
//             provider_id: '1',
//             interest_income: 5289956.0,
//             service_activities: 2461476.0,
//             other_activities: 908267.0,
//             profit_after_tax: 4051008.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 6297033.0,
//             service_activities: 1802735.0,
//             other_activities: 1593940.0,
//             profit_after_tax: 4985667.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 7948656.0,
//             service_activities: 2336531.0,
//             other_activities: 2369393.0,
//             profit_after_tax: 6376756.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 7708611.0,
//             service_activities: 2509140.0,
//             other_activities: 1882983.0,
//             profit_after_tax: 6228856.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 8665177.0,
//             service_activities: 2965770.0,
//             other_activities: 3278998.0,
//             profit_after_tax: 6945586.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 9472505.0,
//             service_activities: 3550799.0,
//             other_activities: 3815175.0,
//             profit_after_tax: 7541833.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 10732209.0,
//             service_activities: 4266331.0,
//             other_activities: 5361174.0,
//             profit_after_tax: 8547757.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 9026243.0,
//             service_activities: 5266381.0,
//             other_activities: 5092568.0,
//             profit_after_tax: 7223565.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 13547651.0,
//             service_activities: 6614281.0,
//             other_activities: 6178852.0,
//             profit_after_tax: 10841271.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 23009485.0,
//             service_activities: 5648065.0,
//             other_activities: 4210327.0,
//             profit_after_tax: 18420014.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 71518.0,
//             service_activities: -2931.0,
//             other_activities: 4612.0,
//             profit_after_tax: 53211.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 12092.0,
//             service_activities: -4921.0,
//             other_activities: 37574.0,
//             profit_after_tax: 2685.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 36691.0,
//             service_activities: 9775.0,
//             other_activities: 11594.0,
//             profit_after_tax: 33532.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 116488.0,
//             service_activities: 33602.0,
//             other_activities: 32331.0,
//             profit_after_tax: 94332.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 158102.0,
//             service_activities: 38202.0,
//             other_activities: 28900.0,
//             profit_after_tax: 126056.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 201488.0,
//             service_activities: 60218.0,
//             other_activities: 49943.0,
//             profit_after_tax: 160856.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 311448.0,
//             service_activities: 71002.0,
//             other_activities: 52296.0,
//             profit_after_tax: 248838.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 456055.0,
//             service_activities: 99768.0,
//             other_activities: 65484.0,
//             profit_after_tax: 364048.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 4598038.0,
//             service_activities: 1436106.0,
//             other_activities: 1270398.0,
//             profit_after_tax: 3414347.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 8392021.0,
//             service_activities: 1152331.0,
//             other_activities: 1024103.0,
//             profit_after_tax: 6259367.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 8167900.0,
//             service_activities: 1278223.0,
//             other_activities: 1185599.0,
//             profit_after_tax: 6169679.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 7750622.0,
//             service_activities: 1520126.0,
//             other_activities: 1495146.0,
//             profit_after_tax: 5807978.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 7303461.0,
//             service_activities: 1178861.0,
//             other_activities: 1397916.0,
//             profit_after_tax: 5727880.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 7345441.0,
//             service_activities: 1459902.0,
//             other_activities: 2202286.0,
//             profit_after_tax: 5716878.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 8453703.0,
//             service_activities: 1698025.0,
//             other_activities: 1298763.0,
//             profit_after_tax: 6765211.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 9206194.0,
//             service_activities: 1855200.0,
//             other_activities: 1994872.0,
//             profit_after_tax: 7458902.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 6730402.0,
//             service_activities: 2767527.0,
//             other_activities: 1878410.0,
//             profit_after_tax: 5416429.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 11780993.0,
//             service_activities: 4055378.0,
//             other_activities: 1497435.0,
//             profit_after_tax: 9476989.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 17084849.0,
//             service_activities: 4340916.0,
//             other_activities: 1909705.0,
//             profit_after_tax: 13757234.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 17589156.0,
//             service_activities: 4960506.0,
//             other_activities: 3398066.0,
//             profit_after_tax: 14215342.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 20946059.0,
//             service_activities: 5861949.0,
//             other_activities: 6537368.0,
//             profit_after_tax: 16834994.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 2377648.0,
//             service_activities: 474247.0,
//             other_activities: 291345.0,
//             profit_after_tax: 1814639.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 4056293.0,
//             service_activities: 565743.0,
//             other_activities: 398386.0,
//             profit_after_tax: 3038864.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 2850997.0,
//             service_activities: 242775.0,
//             other_activities: 558576.0,
//             profit_after_tax: 2138655.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 827868.0,
//             service_activities: 275187.0,
//             other_activities: 203926.0,
//             profit_after_tax: 658706.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 68796.0,
//             service_activities: 345916.0,
//             other_activities: -260787.0,
//             profit_after_tax: 56084.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 60822.0,
//             service_activities: 292041.0,
//             other_activities: 85142.0,
//             profit_after_tax: 39994.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 390630.0,
//             service_activities: 299852.0,
//             other_activities: 67870.0,
//             profit_after_tax: 308932.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 1017579.0,
//             service_activities: 331194.0,
//             other_activities: 431110.0,
//             profit_after_tax: 822830.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 827128.0,
//             service_activities: 346658.0,
//             other_activities: 225570.0,
//             profit_after_tax: 660590.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 1095249.0,
//             service_activities: 383536.0,
//             other_activities: 284128.0,
//             profit_after_tax: 866132.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 1339526.0,
//             service_activities: 467956.0,
//             other_activities: 206024.0,
//             profit_after_tax: 1070181.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 1205066.0,
//             service_activities: 432865.0,
//             other_activities: 253832.0,
//             profit_after_tax: 965437.0,
//         },
//         {
//             provider_id: '1',
//             interest_income: 3709066.0,
//             service_activities: 513815.0,
//             other_activities: 482982.0,
//             profit_after_tax: 2945752.0,
//         },
//     ],
// };
