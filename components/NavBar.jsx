import React from 'react'
import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap'
import styles from '../styles/NavBar.module.css'

const NavBar = () => {
    return (
        <div>
          <Navbar
            expand="md"
            dark
            className={styles.navbar}
          >
            <NavbarBrand href="/">
              <div className={styles.logoContainer}>
                  <span className={styles.logo}></span>
                  <span className={styles.brandName}></span>
              </div>
            </NavbarBrand>
            <NavbarToggler onClick={function noRefCheck(){}} />
            <Collapse navbar>
              <Nav
                className="me-auto"
                navbar
              >
                <NavItem>
                  <NavLink href="/protectedPage/">
                    Protected Page
                  </NavLink>
                </NavItem>
              </Nav>
              {/* User navbar items to be added here */}
            </Collapse>
          </Navbar>
        </div>
    )
}

export default NavBar