import React, { useEffect } from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import { HomeStart } from '../components/homeStart/HomeStart';
import { Order } from '../components/order/Order';
import { Profile } from '../components/profile/Profile';
import { InfoList } from '../components/infoList/InfoList';
import { MainProfile } from './mainProfile/MainProfile';
import { Step } from '../components/Step/Step';
import { Asort } from "../components/asort/Asort";
import { Confirmation } from '../components/confirmation/Confirmation';
import { Payment } from '../components/payment/Payment';


export const Main = () => {

    return (
        <div className='wrapper'>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomeStart />} />
                    <Route path="/mainprofile" element={<MainProfile />}>
                        <Route path="profile" element={<Profile />} />
                        <Route path="infolist" element={<InfoList />} />
                    </Route>
                    <Route path="/order" element={<Order />} >
                        <Route path="step1" element={<Step Components={Asort} />} />
                        <Route path="step2" element={<Step Components={Confirmation} />} />
                        <Route path="step3" element={<Step Components={Payment} />} />
                    </Route>
                    <Route path="*" element={<HomeStart />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
