import React from 'react'
import { Redirect } from 'react-router-dom'

// Redirects to chart but only replace the pathname
export function RedirectPathToHomeOnly({ location }) {
    return <Redirect to={{ ...location, pathname: '/home' }} />
}
