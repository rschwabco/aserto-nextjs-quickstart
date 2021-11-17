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


const NavBar = () => {
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
            </Collapse>
          </Navbar>
        </div>

    )
}

export default NavBar