import { useSelector, useDispatch } from 'react-redux';
import { useState } from "react";

import { setName, setProfileIMG } from '../../redux/slice/profileSlice';

export const Profile = () => {
    const { name, profileIMG } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const [upfile, setUpFile] = useState('');
    const [profName, setProfName] = useState('');


    const changeName = (e) => {
        setProfName(e.target.value);
    };

    const changeImg = (e) => {
        const input = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(input);
        reader.onload = function () {
            setUpFile(reader.result);
        }
        reader.onerror = function () {
            console.log(reader.error);
        }
    };

    const changeProfileInfo = () => {
        !profName.length == 0 && dispatch(setName(profName));
        dispatch(setProfileIMG(upfile));
        localStorage.setItem('name', profName);
        localStorage.setItem('profImg', upfile);
    };


    return (
        <main className="main__profile">
            <div className="main__profile-title">
                <h2>Informacje o koncie</h2>
            </div>
            <div className="main__profile-content">
                <div className="main__profile-content-wrapper">
                    <div className="profile-content-name">
                        <span>Imię Nazwisko:</span>
                        <input onChange={changeName} value={profName} type="text" name="name" placeholder="Sadek Hossen" />
                    </div>
                    <div className="profile-content-img">
                        <span>Wybierz zdjęcie:</span>
                        <div className="content__img-file">
                            <button>Ściągnij</button>
                            <input accept='image/*' onChange={changeImg} type='file' name="file" />
                        </div>
                    </div>
                </div>
                <div className="content-button">
                    <button onClick={changeProfileInfo}>Ratować</button>
                </div>
            </div>
        </main>

    );
}
