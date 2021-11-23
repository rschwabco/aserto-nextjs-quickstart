import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './NavBar'

const Layout = ({children}) => (
    <>
        <main id="app" className="d-flex flex-column h-100" data-testid="layout">
            <NavBar />
            <div className="flex-grow-1">{children}</div>
        </main>
    </>
)

export default Layout