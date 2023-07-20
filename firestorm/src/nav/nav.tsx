'use client'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const FireNav = () => {
return (<Navbar expand="lg" style={{zIndex: 1}} className="bg-body-tertiary position-absolute start-0 end-0 top-0">
          <Container>
            <Navbar.Brand>FireSmoke</Navbar.Brand>
          </Container>
        </Navbar>)
}

export default FireNav;