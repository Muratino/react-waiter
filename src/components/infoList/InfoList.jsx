import { useSelector, useDispatch } from 'react-redux';
import { useState } from "react";

import { setActionLiczba, resetAllInfo } from '../../redux/slice/orderSlice';
import { useEffect } from 'react';


import '../../page/mainProfile/MainProfile.scss';


export const InfoList = () => {
  const { raport, weekDay } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  const [zaklad] = useState(15);

  const takeParams = (days) => {
    days.map(day => { // eslint-disable-line
      let info = localStorage.getItem(day)
      if (info) {
        const newobj = { index: day, elem: info }
        dispatch(setActionLiczba(newobj))
      }
    });
  }

  useEffect(() => {
    takeParams(weekDay)
  }, []) // eslint-disable-line

  const onResetAllInfo = (days) => {
    if (days) {
      days.map(day => { // eslint-disable-line
        let info = localStorage.getItem(day); 
        if (info) {
          localStorage.removeItem(day)
        }
      });
      dispatch(resetAllInfo());
    }
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
              <th className="item__text">Zakład {zaklad} zł</th>
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
          <button onClick={(e) => onResetAllInfo(weekDay)}>Resetowanie</button>
        </div>
      </div>
    </main>

  );
}
