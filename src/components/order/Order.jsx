import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

import { useState } from "react";
import { Header } from "../header/Header";


import './Order.scss';

const steps = [
    { path: 'step1', name: 'Zamówienie' },
    { path: 'step2', name: 'Potwierdzenie' },
    { path: 'step3', name: 'Zapłata' },
]

export const Order = () => {

    return (
        <div className="wrapper">
            <Header rulse={{ input: true, basket: true }} />

            <main className="main">
                <Outlet />
            </main>

            <div className="nav__menu">
                <div className="nav__menu-item">
                    {
                        steps.map((el, index) => (
                            <NavLink
                                to={el.path}
                                key={index} >
                                {({ isActive }) => (
                                    <div className='nav' >
                                        <div style={isActive ? { backgroundColor: '#32B768' } : { backgroundColor: "#6B7280" }}>{index + 1}</div>
                                        <span>{el.name}</span>
                                    </div>
                                )}
                            </NavLink>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
