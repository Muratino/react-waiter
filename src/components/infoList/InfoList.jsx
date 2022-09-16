import { useSelector, useDispatch } from 'react-redux';
import { useState } from "react";

import { setActionLiczba, resetAllInfo, setHours, changeDay } from '../../redux/slice/orderSlice';
import { useEffect } from 'react';

import '../../page/mainProfile/MainProfile.scss';


export const InfoList = () => {
    const { raport, weekDay, today } = useSelector((state) => state.order);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);
    const [zaklad, setZaklad] = useState(15);

    const takeParams = (days, myday) => {
        days.map(day => {
            let info = localStorage.getItem(day);
            let hours = localStorage.getItem(day + 10);
            if (info) {
                const newobj = { index: day, elem: info }
                dispatch(setActionLiczba(newobj))
            }
            if (hours) {
                const newobj = { index: day, time: +hours }
                dispatch(setHours(newobj));
            }
        });
    }

    function getWeekDay(date, arr) {
        return arr[date.getDay()];
    }

    useEffect(() => {
        let date = new Date();
        let mayDay = getWeekDay(date, weekDay);
        // console.log(mayDay);
        dispatch(changeDay(mayDay));
        takeParams(weekDay, today);
    }, [])

    const onResetAllInfo = (days) => {
        if (days) {
            days.map(day => {
                let info = localStorage.getItem(day);
                let hours = localStorage.getItem(day + 10);
                if (info) {
                    localStorage.removeItem(day);
                }
                if (hours) {
                    localStorage.removeItem(day + 10);
                }
            });
            dispatch(resetAllInfo());
        }
    }

    const saveHours = (value, days, myday) => {
        if (myday >= 0) {
            const newobj = { index: myday, time: +value }
            dispatch(setHours(newobj))

            let newItem = myday + 10; // + 10 что бы не спутать с локалстораж выполненных заказовы
            localStorage.removeItem(newItem);
            localStorage.setItem(newItem, value);

        }
        setOpen(false);

    }


    return (
        <main className="main__profile">
            <div className="main__profile-title">
                <h2>Raport</h2>
            </div>
            <div className="list__content">
                <table className="list__content-table">
                    <thead className="list__content-thead">
                        <tr>
                            <th className="item__text">Dni</th>
                            <th className="item__text">Godziny otwarcia</th>
                            <th className="item__text">{zaklad}zł/h </th>
                            <th className="item__text">Liczba zamówień</th>
                        </tr>
                    </thead>
                    <tbody className="list__content-tbody">
                        {
                            raport.map(item => (
                                <tr key={item.dni}>
                                    <td className="item-text-body">{item.dni}</td>
                                    <td className="item-text-body">{item.h} h</td>
                                    <td className="item-text-body"></td>
                                    {/* sth */}
                                    <td className="item-text-body">{item.liczba}</td>
                                </tr>
                            ))
                        }
                        <tr>
                            <td className="item-text-body">Suma</td>
                            <td className="item-text-body">{
                                raport.reduce((elem, sum) => elem + sum.h, 0)
                            } h</td>
                            <td className="item-text-body">{
                                raport.reduce((elem, sum) => elem + sum.h, 0) * zaklad
                            } zl</td>
                            <td className="item-text-body">{
                                raport.reduce((elem, sum) => elem + sum.liczba, 0)
                            } sh</td>
                        </tr>
                    </tbody>
                </table>
                <div className="list__button">
                    <button onClick={() => setOpen(prev => !prev)}>Godziny</button>
                    <button onClick={(e) => onResetAllInfo(weekDay)}>Resetowanie</button>
                    <div className={`modal-hours ${open && 'active-h'}`}>
                        <span>Ile godzin pracy?</span>
                        <input onChange={e => setValue(e.target.value)} type="number" value={value} name='text-h' />
                        <button onClick={() => saveHours(value, weekDay, today)} >ok</button>
                    </div>
                </div>
            </div>
        </main>

    );
}

