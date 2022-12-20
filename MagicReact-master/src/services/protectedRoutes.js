import {React, useEffect} from "react"
import {  useHistory} from "react-router-dom"

const ProtectedRoutes = (props) => {
    const { Component } = props
    const history = useHistory()

    useEffect(() => {
        const auth = localStorage.getItem("loggedIn")
        if (!auth) {
            history.push('/login')
        }
    })
    
    return (
        <div>
        abc
        <Component/>
        </div>
    )
}
 
export default ProtectedRoutes