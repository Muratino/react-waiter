import { Link } from "react-router-dom";


import order from '../../assets/Order illustration.svg';
import './HomeStart.scss'

export const HomeStart = () => {
    return (
        <div className="start__page">
            <div className='container'>
                <img src={order} alt="img" />
                <h1 className='container-tittle'>Witaj, co chciałbyś zrobić?</h1>
                <div className="container__button">
                    <Link to='/order/step1' className="container__button-item">Nowe zamówienie</Link>
                    <Link to='/mainprofile/profile' className="container__button-item another">Zobacz profil</Link>
                </div>
            </div>
        </div>
    );
}
