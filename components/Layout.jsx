import React from 'react';
import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './NavBar'

const Layout = ({children}) => (
    <>
        <main id="app" className="d-flex flex-column h-100" data-testid="layout">
            <NavBar />
            <Container className="flex-grow-1 mt-5">{children}</Container>
        </main>
    </>
)

export default Layout