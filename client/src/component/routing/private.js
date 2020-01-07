import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom'
import AuthContext  from '../../context/auth/authContext'
// import UserContext  from '../../context/auth'

const PrivateRoute = ({compoent: Component, ...rest}) => {
    const context = useContext(AuthContext)
    const {isAuthenticated, loading} = context;
    return(
       <Route {...rest} render={props => !isAuthenticated && !loading ? (<Redirect to="/login"/>
       ):(
           <Component {...props} />
       )} />
    )
}


export default PrivateRoute;