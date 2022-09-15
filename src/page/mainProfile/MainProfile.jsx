import { NavLink, Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";

import { setName, setProfileIMG } from '../../redux/slice/profileSlice';
import { Header } from "../../components/header/Header";

import listIcon from '../../assets/Frame.svg';
import ActivehumanIcon from '../../assets/Framr2.svg';
import humanIcon from '../../assets/Framer22.svg';
import ActiveListIcon from '../../assets//Frame11.svg';

import './MainProfile.scss'
import '../../components/order/Order.scss';

export const MainProfile = () => {
    const { name, profileIMG } = useSelector((state) => state.profile);
    const dispatch = useDispatch();

    const upInfoProfile = () => {
        const name = localStorage.getItem('name');
        const profileIMG = localStorage.getItem('profImg');
        name && dispatch(setName(name))
        profileIMG && dispatch(setProfileIMG(profileIMG))
    }

    useEffect(() => {
        upInfoProfile();
    }, [])


    return (
        <>
            <Header rulse={{ input: false }} />

            <Outlet />

            <div className="main__profile-menu">
                <div className="profile__menu-item">
                    <NavLink to='infolist'>
                        {({ isActive }) => (
                            <img src={isActive ? ActiveListIcon : listIcon} alt="img" />
                        )}
                    </NavLink>
                    <NavLink to='profile'>
                        {({ isActive }) => (
                            <img src={isActive ? ActivehumanIcon : humanIcon} alt="img" />
                        )}
                    </NavLink>
                </div>
            </div>
        </>

    );
}

