// import { useState } from "react";
import { useSelector } from 'react-redux';

import { Skeleton } from '../skeleton/Skeleton';
// import { Asort } from "../asort/Asort";
import { Error } from "../error/Error";
import Spinner from '../spinner/Spinner';
// import { setSearch, setStatus, setArrAsort, setNewZamov } from "../../redux/slice/orderSlice";



export const Step = ({ Components }) => {
    const { status } = useSelector((state) => state.order);

    // const someClick = () => {
    //     console.log('something is happening...');
    // }

    const loading = status === 'loading' ? <Spinner /> : null;
    const success = status === 'success' ? <Components /> : null;
    const notFounded = status === 'notFounded' ? <Error notFounded={true} /> : null;
    const error = status === 'error' ? <Error /> : null;

    return (
        <>
            {
                !notFounded && !loading && !success && !error ? <Skeleton /> : null
            }
            {loading}
            {success}
            {notFounded}
            {error}
        </>
    );
}

