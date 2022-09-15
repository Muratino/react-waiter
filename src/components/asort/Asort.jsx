import { useCallback } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useCreateNewOrder } from "../../hooks/useCreateNewOrder";

import '../order/Order.scss';

export const Asort = () => {
    const { arrAsort } = useSelector((state) => state.order);
    const [open, setOpen] = useState(false);
    const [num, setNum] = useState(1);

    const { createOrder, logThisOrder } = useCreateNewOrder();

    const someAsort = () => {
        setOpen(prev => !prev);
    }
    
    const saveZamov = useCallback((arr, num) => {
        const res = createOrder(arr, num);
        logThisOrder(res);
        someAsort();
    }, [arrAsort])

    const numberInput = (e) => {
        setNum(e.target.value);
    }

    const { desc, id, name, img, price } = arrAsort[0];

    return (
        <>
            <div className={`modal ${open ? 'modal__open' : ''}`}>
                <div className="modal__text">
                    <p>Zostało dodane:  <span>{name}</span></p>
                    <div className="modal__input">
                        <p>Jak:</p>
                        <input onChange={numberInput} type="number" name="num" value={num} />
                    </div>
                </div>
                <div className="modal__next">
                    <span>{price * num} zl</span>
                    <button onClick={() => saveZamov(arrAsort[0], num)}>Dalej</button>
                </div>
            </div>


            <div className="order__step">
                <img src={img} alt="img" />
                <div className="order__step-info">
                    <h3>{name}</h3>
                    <p>{desc}</p>
                </div>
                <div className="order__step-btn">
                    <span>{price} zl</span>
                    <button onClick={someAsort}>Dodać</button>
                </div>
            </div>

        </>
    );
}


// const View = ({ arrAsort, someAsort }) => {
//     // const [num, setNum] = useState(1);
//     // const { desc, id, name, img, price } = arrAsort;
//     // const { createOrder, logThisOrder } = useCreateNewOrder();

//     // const saveZamov = () => {
//     //     const res = createOrder(arrAsort, num);
//     //     logThisOrder(res);
//     //     someAsort();
//     // }

//     // const numberInput = (e) => {
//     //     setNum(e.target.value);
//     // }

//     return (
//         <div className="modal">
//             <div className="modal__text">
//                 <p>Zostało dodane:  <span>{name}</span></p>
//                 <div className="modal__input">
//                     <p>Jak:</p>
//                     <input onChange={numberInput} type="number" name="num" value={num} />
//                 </div>
//             </div>
//             <div className="modal__next">
//                 <span>{price * num} zl</span>
//                 <button onClick={saveZamov}>Dalej</button>
//             </div>
//         </div>
//     )
// }