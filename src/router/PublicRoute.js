import React from 'react'
import PropTypes from 'prop-types'
import { Navigate, Outlet } from 'react-router'

export const PublicRoute = ({ isAuthenticated }) => {
    return !isAuthenticated ? <Outlet /> : <Navigate to="/" />
}

PublicRoute.propType = {
    isAuthenticated: PropTypes.bool.isRequired,
}