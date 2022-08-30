import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import urls from "../Constants/urls";
import { login, logout } from "../Redux/Slices/UserSlice";
import { verifyToken } from "../Services/fetchData";

export default function Auth({ children }) {

    const { loggedIn } = useSelector(state => state.user)
    const [token, setToken] = useState(localStorage.getItem('token'))
    const dispatch = useDispatch()

    useEffect(() => {
        if (!loggedIn && token)
            verifyToken({ token })
                .then(res => {
                    dispatch(login(token))
                    setToken(token)
                })
                .catch(err => {
                    dispatch(logout())
                    setToken(null)
                })
    }, [])

    if (!loggedIn && !token)
        return <Navigate to={urls.LOGIN} replace="true" />
    
    if(loggedIn)
        return <>{children}</>
}