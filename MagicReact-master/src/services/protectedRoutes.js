import {React, useEffect} from "react"
import { useHistory} from "react-router-dom"

import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'js-cookie'

const ProtectedRoutes = (props) => {
    const { Component } = props
    const history = useHistory()
    
    const auth = Cookies.get("loggedInUserDetails")

    useEffect(() => {
        //const auth = localStorage.getItem("loggedIn")
        if (!auth || auth === null) {
            history.push('/login')
            //toast.error('Please Login Again!')
        }
    }, [])
    
    return (
        <div>
        
        </div>
    )
}
 
export default ProtectedRoutes