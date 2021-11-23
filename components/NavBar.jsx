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
import { useUser } from '@auth0/nextjs-auth0';
import AnchorLink from './AnchorLink';
import Image from 'next/image'
import styles from '../styles/NavBar.module.css'


const NavBar = () => {
    const { user, isLoading } = useUser();
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
              {!isLoading && !user && (
                <Nav>
                    <NavItem id="qsLoginBtn">
                      <AnchorLink
                        href="/api/auth/login"
                        className="btn btn-primary btn-margin"
                        tabIndex={0}
                        testId="navbar-login-desktop">
                        Log in
                      </AnchorLink>
                    </NavItem>
                </Nav>
              )}
              {user && (
                <Nav>
                    <NavItem className={styles.userimage}>
                        <Image
                          src={user.picture}
                          alt="Profile"
                          className="nav-user-profile d-inline-block rounded-circle mr-3"
                          width="50"
                          height="50"
                          decode="async"
                          data-testid="navbar-picture-mobile"
                        />
                    </NavItem>
                    <NavItem className={styles.username}>
                      <span className="d-inline-block" data-testid="navbar-user-mobile">
                          {user.name}
                        </span>
                    </NavItem>
                    <NavItem id="qsLogoutBtn">
                      <AnchorLink
                        href="/api/auth/logout"
                        className="btn btn-secondary btn-margin"
                        testId="navbar-logout-mobile">
                        Log out
                      </AnchorLink>
                    </NavItem>
                </Nav>
              )}
            </Collapse>
          </Navbar>
        </div>

    )
}

export default NavBar