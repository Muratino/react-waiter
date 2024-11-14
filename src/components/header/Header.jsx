import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { setName, setProfileIMG } from "../../redux/slice/profileSlice";
import { deletZamov } from "../../redux/slice/orderSlice";
import { Search } from "../search/Search";
import { FaTrashAlt } from "react-icons/fa";


import basket from '../../assets/bi_basket-fill.svg';
import arrowLeftIcon from '../../assets/arrow-left-solid.svg';
import '../order/Order.scss';

export const Header = ({ rulse }) => {
    const dispatch = useDispatch();
    const { name, profileIMG } = useSelector((state) => state.profile);
    const { zamov } = useSelector((state) => state.order);
    const [modal, setModal] = useState(false);


    const upInfoProfile = () => {
        const name = localStorage.getItem('name');
        const profileIMG = localStorage.getItem('profImg');
        name && dispatch(setName(name))
        profileIMG && dispatch(setProfileIMG(profileIMG))
    }

    useEffect(() => {
        upInfoProfile();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const openModal = () => [
        setModal(prev => !prev)
    ]

    const deleteCart = (id) => {
        dispatch(deletZamov(id))
    }

    return (

        <header className='header__order'>
            <div className="header__order-search">
                <Link to='/'>
                    <img src={arrowLeftIcon} alt="img" />
                </Link>
                {
                    rulse.input
                        ? <Search />
                        : null
                }
            </div>
            <div className="header__order-info">
                {
                    rulse.basket && zamov.length > 0
                        ? <img onClick={openModal} className="basket" src={basket} alt="basket" />
                        : null
                }
                <span>{name}</span>
                <img src={profileIMG ? profileIMG : 'https://esportnow.pl/wp-content/uploads/2017/09/profile.png'} alt="profile" />
                {
                    modal
                        ? (<div className={`shop-cart ${modal ? 'active' : ''}`}>
                            {
                                zamov.map(el => {
                                    return (
                                        <div key={el.id} className="cart-item">
                                            <div className="cart-item-rigth">
                                                <img src={el.basket.img} alt="img" />
                                                <h2>{el.basket.name}</h2>
                                            </div>
                                            <div className="cart-item-left">
                                                <FaTrashAlt
                                                    onClick={() => deleteCart(el.id)}
                                                    className={`shop-cart-button`}
                                                />
                                                <p>{el.basket.money} zl</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>)
                        : null
                }
            </div>
        </header>
    );
}
