


import error from './error.gif'
import '../order/Order.scss';

export const Error = ({ notFounded }) => {
    return (
        <div className='error'>
            <img
                src={error}
                alt='error' />

            <span>{notFounded ? "Nie można znaleźć, spróbuj ponownie" : 'Coś poszło nie tak:('}</span>
        </div>
    );
}

