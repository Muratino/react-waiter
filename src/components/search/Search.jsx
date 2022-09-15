import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';
import { setSearch, setStatus } from "../../redux/slice/orderSlice"; 
import { fetchAllAsortyment } from "../../redux/slice/orderSlice";

import '../order/Order.scss';


export const Search = () => {
    const dispatch = useDispatch();
    const { search, status } = useSelector((state) => state.order);    
    const [ value, setValue ] = useState('');
    const myRef = useRef();

    useEffect(() => {
        search && dispatch(fetchAllAsortyment({search}))
    }, [search])

    const testDebounce = useCallback(
        debounce((str, setSome) => {
            dispatch(setSome(str));
        }, 500),
        [],
    );

    const changeValue = (e) => {
        setValue(e.target.value);
        testDebounce(e.target.value, setSearch);
    }


    return (
        <input ref={myRef} onChange={changeValue} type="text" name='search' value={value} placeholder='Search' />
    );
}

