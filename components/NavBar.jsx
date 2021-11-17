import React from 'react'
import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText

} from 'reactstrap'
import { useUser } from '@auth0/nextjs-auth0';
import AnchorLink from './AnchorLink';

const NavBar = () => {
    const { user, isLoading } = useUser();
    return (
        <div>
          <Navbar
            color="light"
            expand="md"
            light
          >
            <NavbarBrand href="/">
              Aserto
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
                <NavItem>
                  <NavLink href="/displayState">
                    Display State
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
                    <NavItem>
                      <span className="user-info">
                        <img
                          src={user.picture}
                          alt="Profile"
                          className="nav-user-profile d-inline-block rounded-circle mr-3"
                          width="50"
                          height="50"
                          decode="async"
                          data-testid="navbar-picture-mobile"
                        />
                        <h6 className="d-inline-block" data-testid="navbar-user-mobile">
                          {user.name}
                        </h6>
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