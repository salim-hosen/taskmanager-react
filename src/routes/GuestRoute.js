import React from 'react';
import {Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

const GuestRoute = ({ children, user}) => {

    const location = useLocation();
    if(user.authenticated){

        return <Navigate to="/dashboard" state={{ from: location }} />

    }

    return <Outlet/>;
};

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(GuestRoute);