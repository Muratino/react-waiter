import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';
import { setSearch } from "../../redux/slice/orderSlice";
import { fetchAllAsortyment } from "../../redux/slice/orderSlice";

import '../order/Order.scss';


export const Search = () => {
    const dispatch = useDispatch();
    const { search } = useSelector((state) => state.order);
    const [value, setValue] = useState('');
    const myRef = useRef();

    useEffect(() => {
        search && dispatch(fetchAllAsortyment({ search }))
    }, [search]) // eslint-disable-line

    const testDebounce = useCallback( // eslint-disable-line
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

