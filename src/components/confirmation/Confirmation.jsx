import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { setChekZamov } from "../../redux/slice/orderSlice";

import wait from '../../assets/Safe Food.svg';

export const Confirmation = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { zamov } = useSelector((state) => state.order);
    const [chek, setChek] = useState(true);
    // const [open, setOpen] = useState(false);

    // const localZamov = () => {
    //     if (store.length > 0) {
    //         let arr;
    //         store.map(elem => arr = localStorage.getItem(elem));
    //         // console.log(JSON.parse(arr));
    //         dispatch(setNewZamov(JSON.parse(arr)));
    //     }
    // }

    // useEffect(() => {
    //     localZamov();
    // }, [store])



    const changeInput = (e, id) => {
        // const checked = e.target.checked;
        dispatch(setChekZamov(id));
    }


    const chekAllElements = (elem) => {
        return elem.chek === true;
    }

    const nextStep = (e) => {
        e.preventDefault();

        console.log(zamov);
        if (zamov.every(chekAllElements)) {
            !chek && setChek(true);
            navigate("/order/step3");
        } else {
            setChek(false);
        }

    }

    return (
        <>

            <div className='basket'>
                <img src={wait} alt="img" />
                <h1 className='basket-tittle'>Zamówienie klienta oczekujące na potwierdzenie</h1>
                <div className="klient__info">
                    <form>
                        {/* {
                            open 
                            ? <div className="open__modal-from">Oczekiwać...</div>
                            : null
                        } */}
                        {
                            zamov.map(elem => {
                                return (
                                    <div className='klient__form' key={elem.id}>
                                        <div className="klient__label">
                                            <label htmlFor='chekbutton'>Zamówienie:  <span>{elem.basket.name}</span></label>
                                            <label htmlFor='chekbutton'>Jak:  <span>{elem.basket.num}</span></label>
                                            <label htmlFor='chekbutton'>Cena:  <span>{elem.basket.money}zl</span></label>
                                        </div>
                                        <div className="error__msg">
                                            {
                                                chek
                                                    ? null
                                                    : <span className='error__span'>Trzeba potwierdzić</span>
                                            }
                                            {
                                                elem.chek
                                                    ? <input checked onChange={(e) => changeInput(e, elem.id)} type='checkbox' name="chekbutton" id='chekbutton' />
                                                    : <input onChange={(e) => changeInput(e, elem.id)} type='checkbox' name="chekbutton" id='chekbutton' />
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div className="klient__button">
                            <button type='submit' onClick={nextStep}>Dalej</button>
                        </div>
                    </form>
                </div>
            </div>


        </>
    );
}

