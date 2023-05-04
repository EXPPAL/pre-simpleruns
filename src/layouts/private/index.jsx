import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { connect } from "react-redux";
import { Component } from 'react';

class PrivateRoute extends Component {
    render() {
        const { isLoggedIn } = this.props;
        return isLoggedIn ? <Outlet /> : <Navigate to="/auth" />;
    }
}

function mapStateToProps(state) {
    const { isLoggedIn } = state.auth;

    return {
        isLoggedIn
    };
}

export default connect(mapStateToProps)(PrivateRoute);
