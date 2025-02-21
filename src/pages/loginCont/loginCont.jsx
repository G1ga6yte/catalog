import React, {useState} from "react";
import "./LoginCont.scss"
import {useCartContext} from "../../cartContext";
import bcrypt from 'bcryptjs';
import {Users} from "./users.js";
import Cookies from "js-cookie";


function LoginCont() {
    const {setLoginCont, setAuthenticated, setAccountInfo, setLoading} = useCartContext()
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const handleLogIn = (e) => {
        e.preventDefault();
        setLoading(true)

        const user = Users.find((user)=>user.username === formData.username);

        setTimeout(()=>{
            if (user && bcrypt.compareSync(formData.password, user.password)) {
                setAuthenticated(true);
                setLoginCont(false);
                setAccountInfo(user)
                Cookies.set("AccountInfo", JSON.stringify(user));
                setLoading(false)
            } else {
                setErrorMessage("Пароль или логин введен неправильно.")
                setLoading(false)
            }
        }, 500)

    }

    const handleChange = (e) => {
        setErrorMessage("")
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };


    ////Admin Tool for Reg
    const handleReg = (e)=>{
        e.preventDefault();
        const hashedPassword = bcrypt.hashSync(formData.password, 10);
        console.log(hashedPassword)
    }


    return (
        <div className="LoginContainer">
            <div onClick={() => setLoginCont(false)} className="backgroundBlock"></div>

            <div className="loginDialog">
                <form className="form" onSubmit={handleLogIn}>

                    <p className="header">Авторизируйтесь в ваш аккаунт.</p>
                    <label className="inputLabel" htmlFor="username">
                        <p className="labelText">Логин</p>
                        <input name="username" id={"username"} onChange={handleChange} value={formData.username} type="text"
                               className={`loginInput ${errorMessage.length > 0 && "errorInput"}`}/>
                    </label>
                    <label className="inputLabel" htmlFor="password">
                        <p className="labelText">Пароль</p>
                        <input name="password" id={"password"} onChange={handleChange} value={formData.password}
                               type="password" className={`loginInput ${errorMessage.length > 0 && "errorInput"}`}/>
                    </label>
                    {errorMessage.length > 0 && <p className="errorMessage">{errorMessage}</p>}
                    <button type="submit" className="loginBtn">Логин</button>
                </form>

            </div>
        </div>
    )
}

export default LoginCont;