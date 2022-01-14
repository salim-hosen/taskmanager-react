import React from 'react';
import {Navigate, Outlet, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

const AuthRoute = ({ children, user}) => {

    const location = useLocation();

    if(!user.authenticated){

        return <Navigate to="/sign-in" state={{ from: location }}/>;

    }

    return <Outlet/>

};

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(AuthRoute);