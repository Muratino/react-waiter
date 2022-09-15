import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";

import { setChekPayment, deletAll, setHours, setLiczba } from '../../redux/slice/orderSlice';

import ready from '../../assets/Order Success.svg';
import like from '../../assets/ant-design_like-filled.svg';
import { useCallback } from 'react';


export const Payment = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { zamov, raport, weekDay } = useSelector((state) => state.order);
    const [payment, setPayment] = useState(true);
    const [open, setOpen] = useState(false);


    const changeInput = (e, id) => {
        const checked = e.target.checked;
        dispatch(setChekPayment(id));
    }

    const chekAllElements = (elem) => {
        return elem.payment == true;
    }


    const saveParams = (elem) => {
        localStorage.removeItem(elem);
        localStorage.setItem(elem, raport[elem].liczba + 1);

    }

    const endStep = (e) => {
        e.preventDefault();

        if (zamov.every(chekAllElements)) {
            !payment && setPayment(true);
            setOpen(true)

            dispatch(setLiczba(weekDay[1]))
            saveParams(weekDay[1]);

            setTimeout(() => {
                dispatch(deletAll());
                navigate("/");
                setOpen(false);
            }, 3000);
        } else {
            console.log('no');
            setPayment(false);
        }

    }

    const changePayment = (e, arr) => {
        const checked = e.target.checked;
        arr.map(elem => dispatch(setChekPayment(elem.id)))
    }

    if (zamov.length > 1) {
        const id = uuidv4().substring(0, 5);
        let money = 0;

        money = zamov.reduce((a, b) => a + b.basket.money, 0);

        const newOrder = {
            id,
            money,
        }

        return (
            <>
                {
                    open
                        ? <View />
                        : null
                }
                <div className='basket'>
                    <img src={ready} alt="img" />
                    <h1 className='basket-tittle'>Potwierdzenie płatności klienta</h1>
                    <div className="klient__info">
                        <p>Potwierdzenie płatności za zamówienie №{newOrder.id}</p>
                        <div className="klient__num">
                            <p>№ {newOrder.id}: <span>{newOrder.money}zl</span></p>
                            <div className="error__msg">
                                {
                                    payment
                                        ? null
                                        : <span className='error__span'>Trzeba potwierdzić</span>
                                }
                                {
                                    zamov.payment
                                        ? <input checked onChange={(e) => changePayment(e, zamov)} type='checkbox' name="checkbox" id='checkbox' />
                                        : <input onChange={(e) => changePayment(e, zamov)} type='checkbox' name="checkbox" id='checkbox' />
                                }
                            </div>
                        </div>
                        <div className="klient__button">
                            <button onClick={endStep}>Dalej</button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            {
                open
                    ? <View />
                    : null
            }
            <div className='basket'>
                <img src={ready} alt="img" />
                <h1 className='basket-tittle'>Potwierdzenie płatności klienta</h1>
                <div className="klient__info">
                    <p>Potwierdzenie płatności za zamówienie №{zamov[0].id}</p>
                    <div className="klient__num">
                        <p>№ {zamov[0].id}: <span>{zamov[0].basket.money}zl</span></p>

                        <div className="error__msg">
                            {
                                payment
                                    ? null
                                    : <span className='error__span'>Trzeba potwierdzić</span>
                            }
                            {
                                zamov.payment
                                    ? <input checked onChange={(e) => changeInput(e, zamov[0].id)} type='checkbox' name="checkbox" id='checkbox' />
                                    : <input onChange={(e) => changeInput(e, zamov[0].id)} type='checkbox' name="checkbox" id='checkbox' />
                            }
                        </div>
                    </div>
                    <div className="klient__button">
                        <button onClick={endStep}>Dalej</button>
                    </div>
                </div>
            </div>
        </>
    );
}

const View = () => {

    return (
        <>
            <div className="modal__end">
                <img src={like} alt="img" />
                <span>Wszystko w porządku, zamówienie zakończone</span>
            </div>
        </>
    )

}