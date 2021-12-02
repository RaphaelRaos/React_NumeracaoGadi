import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isAuthenticatedLogin, isAuthenticated, isAuthenticatedGadi } from './auth'

export const PrivateRoute = props => isAuthenticatedLogin()
    ? <Route {...props} />
    : <Redirect to='/' />

export const RoutesCrh = props => isAuthenticated()
    ? <Route {...props} />
    : <Redirect to='/' />


export const RoutesCrhGadi = props => isAuthenticatedGadi()
    ? <Route {...props} />
    : <Redirect to='/' />