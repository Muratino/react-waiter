import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { setNewZamov, setStore } from '../redux/slice/orderSlice';
//https://62bdc6edc5ad14c110c685b7.mockapi.io/orders


export const useCreateNewOrder = () => {
    const dispatch = useDispatch();


    const createOrder = (obj, num) => {
        const id = uuidv4().substring(0, 5);
        const newOrder = {
            id,
            chek: false,
            payment: false,
            basket: {
                id: obj.id,
                name: obj.name,
                img: obj.img,
                num: num,
                money: obj.price * num
            }
        };

        return newOrder;
    }

    const logThisOrder = (newOrder) => {
        dispatch(setNewZamov(newOrder));

        // let name = newOrder.id;
        // dispatch(setStore(`${name}`));
        // localStorage.setItem(`${name}`, JSON.stringify(newOrder));

        // dispatch(setBasket(newOrder));

        // axios.post('https://62bdc6edc5ad14c110c685b7.mockapi.io/orders', newOrder)
        //     .then(res => console.log(res))
        //     .catch(e => console.log(e))
    }


    return {
        createOrder,
        logThisOrder
    }

}

