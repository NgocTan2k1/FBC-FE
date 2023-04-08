import { useNavigate } from 'react-router-dom';
import { Form, Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut, faPaperPlane, faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './Chat.module.scss';
const NodeRSA = require('node-rsa');

const cx = classNames.bind(styles);

function Chat() {
    // const pub =
    //     '-----BEGIN PUBLIC KEY-----\nMIGhMA0GCSqGSIb3DQEBAQUAA4GPADCBiwKBgwMO0CYkaj6AE3y5f3tP4QIep76a\n35ZXcJosvQj8yjs94UZmg8/6R8tyCfBcYm6B3jfDyXMB1hKlW6IP8JtG52Hr7bQg\n4tGR4JvBIeScW9i01x3HF/URlwJibD1eYs8RXVzo4jeHrUfiXaDKxEbmRobGZ5JD\nUHGdKtfOSmx9amGZBjwdAgMBAAE=\n-----END PUBLIC KEY-----';
    // const priv = '';

    const pub =
        '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0ifmHaoDftmh95bmEWq1\nMhDqwXQsPhIXCs+6mtTBwjEmUfGG5NXCwO3vwW9lPd7NIBlyuhygYxtcL7FbIF54\n8PAm+O+9oi4z6VLAnYd6fzCKzo272LTrWdA0TsHm9Zsc8qAH5wfg1R5JigozLpUW\n3fDJ9YQyWZLapvAWMO/WWPCSeMV+P3rsJQtCuND01NNB6YSIlkkfprhLWwYKaDKK\nlBOLYmkcdZwXCS+IwkRm2N6/QnTXM4Zdp51aOCfssFIYLExoe+DkIX6Fnx/YhfGk\nQtqrw57ObYTzeWWYpTbyqRzGssJvCrwo6rKbldxEt4XRTpzt2tgt7CBPOccZcP0F\nfQIDAQAB\n-----END PUBLIC KEY-----';

    const priv =
        '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDSJ+YdqgN+2aH3\nluYRarUyEOrBdCw+EhcKz7qa1MHCMSZR8Ybk1cLA7e/Bb2U93s0gGXK6HKBjG1wv\nsVsgXnjw8Cb4772iLjPpUsCdh3p/MIrOjbvYtOtZ0DROweb1mxzyoAfnB+DVHkmK\nCjMulRbd8Mn1hDJZktqm8BYw79ZY8JJ4xX4/euwlC0K40PTU00HphIiWSR+muEtb\nBgpoMoqUE4tiaRx1nBcJL4jCRGbY3r9CdNczhl2nnVo4J+ywUhgsTGh74OQhfoWf\nH9iF8aRC2qvDns5thPN5ZZilNvKpHMaywm8KvCjqspuV3ES3hdFOnO3a2C3sIE85\nxxlw/QV9AgMBAAECggEAXYnowLdVivZvQvZlPMdUEw64jpaYwp/mpadEFXoxK7AY\nsExikCQc5SaCmoRseZdbkbgB+piXQsWAyLGWL9gc2JDrp819iFwsOuPcW8FbYpVG\nkx0+yPvt7THgtlVT6Wm6/rsACXLWPcWXUdusYEV3wh1UpvTKPFhC/h7Kocl+jGLo\nlhsIvN5ZEEUQ24nG/M9TAmEDQ5vZ6bYMCqr5u0kFMww45+jI1cwBDsJ0dE8c9Pui\nR8fzzk4U8q4RI4ZbxG+JVNfVcG2xVPhEhlWcNeBgGWgT+b8LgcnrfKLI3FJQWXlB\nXU3teHJcrbFCD6fipJ2tSp/wEw9jtShGzl6A4aKGwQKBgQD6lj1YUUovH541uRwb\nQ2SQs1es0siFCmG8/Rphn9mXoEXtqPBBuT+el8DgTWMpamwiLhU6wVo3DZTZufJT\nPI7rzZypxDH7Bcupmk6h++fravJQ5JdxLhYasyGiEsevgjfytGPQcVeobqBFwQvb\nacXTVEdSlffXgXfzRP2cp0k0hQKBgQDWshLEx4feVHr1uB9nuAbxOjZJgzvSHWZ+\n6iMEBF6huEVbsRE4IFlkLloKfzRSQ+DUsLomPyYjDKiCldbSxV56We/p5NFZqkeD\nnsje9TUBlPqvWhQvGHRUVnABmkmo0QyTn9/VJfzhg1+5tptrG3E8X6KnpvaRzwoO\nNiPn5AS6mQKBgCrcy/1xWikZVWyHD0Gyk18U7ihHnbjz/6fd+0c7mnKPHab7QK1d\nTH6KIpm7YvzQkVJ/Y247aH0GO7HKVqLaNvAqqWN4hbwUT7PhCxY2CoOANZaUozre\n0TUb8uLQJ4vj0EIZjQE4ge/zjEKiNK8BNq9hORntQQmBwczAvkivbJwpAoGAbrDe\n5l+tWF6cCqYEYxhJVAPcS2iC5iDMYHDc3sxV8fEsqUqQgyyCihkvySuuUR+4AlCf\nmOqEAhwboUAZww+JV3GZNTEJEr6tIloyXGl2C7vAx7mcoG9uQrFSDDF8+rHVVyNd\nZuqwB6ERMJHKbZ13c1YnaWK2y5RALfWR65PvMDkCgYEA2fBjherPiUx3IkTqffLg\nevI84CBVg7no2avUcuKhx6okpShyYZLWwM34AMgcRIkCvtCQh1aOycQqm2DpMrKE\nei1b+IRJUrOGVx+aBBU9wlQ7wk9LLnhU7mlJsOsfy36L08gABeHx1uEClnz5xvDA\nZnV8tctnitWjPVE8uHBpdQs=\n-----END PRIVATE KEY-----';

    const data = 'Hello, world!';
    // console.log('pub:', pub);
    // console.log('priv:', priv);
    // console.log('data:', data);

    const publicKey = new NodeRSA();
    publicKey.importKey(pub, 'pkcs8-public');

    const privateKey = new NodeRSA();
    privateKey.importKey(priv, 'pkcs8-private');
    // console.log('publicKey:', publicKey);
    // console.log('privateKey:', privateKey);

    // const encryptedData = publicKey.encrypt(data, 'base64');
    // const decryptedData = privateKey.decrypt(encryptedData, 'utf-8');

    // console.log('encryptedData:', encryptedData);
    // console.log('decryptedData:', decryptedData);

    const navigate = useNavigate();
    const [value, setValue] = useState('');

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/');
    };

    const handleSetValue = (e) => {
        if (e === '\n') {
            alert('OK');
        }
        if (e !== '\n') {
            setValue(e);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSendQuestion();
            event.target.value = '';
            event.preventDefault();
        }
    };

    const handleSendQuestion = () => {
        if (value.data) {
            setValue('');
            console.log('data no encrypt...: ', value.data);
            console.log('data encrypt   ...: ', publicKey.encrypt(value.data, 'base64'));
            console.log('data decrypt   ...: ', privateKey.decrypt(publicKey.encrypt(value.data, 'base64'), 'utf-8'));
        } else {
            alert('No data');
        }
    };

    const handleSendQuestionAgain = () => {
        if (value.data) {
            console.log('sending...: ', value.data);
        } else {
            alert('No data');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container_content')}>{}</div>

            <div className={cx('container_input')}>
                <button onClick={handleSendQuestionAgain} className={cx('repeat-answer')}>
                    <FontAwesomeIcon className={cx('icon-repeat-answer')} icon={faArrowRotateRight} />
                    Regenerate response
                </button>
                <Form onValuesChange={handleSetValue} className={cx('form')}>
                    <Form.Item name="data" className={cx('form-item')}>
                        <Input.TextArea
                            onChange={(event) => console.log(event.target.value)}
                            value={value}
                            onKeyDown={handleKeyDown}
                            autoSize={{ minRows: 1, maxRows: 10, minHeight: 42, maxHeight: 420 }}
                            className={cx('form-item--data')}
                            type="text"
                            placeholder="Enter the question!"
                        />
                    </Form.Item>
                    <button onClick={handleSendQuestion} className={cx('btn-send-question')}>
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                </Form>
                <button className={cx('btn-logout')} onClick={handleLogout}>
                    <p className={cx('title-logout')}>Log Out</p>
                    <FontAwesomeIcon className={cx('icon-logout')} icon={faSignOut} />
                </button>
            </div>
        </div>
    );
}

export default Chat;
