import React from 'react'
import PropTypes from 'prop-types'
import { Navigate, Outlet } from 'react-router'

export const PrivateRoute = ({ isAuthenticated }) => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

PrivateRoute.propType = {
    isAuthenticated: PropTypes.bool.isRequired
}
