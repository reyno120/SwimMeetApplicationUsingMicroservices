import { React, useState } from 'react';
import { Navbar, NavbarBrand, NavbarToggler } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import HostMeetModal from '../../meets/create/HostMeetModal';
import './NavMenu.css';

export function NavMenu() {
    const [collapsed, setCollapsed] = useState(true);
    const [hostMeetModalState, setHostMeetModalState] = useState(false);

    const toggleHostMeetModal = () => {
        setHostMeetModalState(!hostMeetModalState);
    }

    const toggleNavbar = () => {
        setCollapsed(!collapsed);
    }

    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow color-theme mb-3" container light>
                <NavbarBrand tag={Link} to="/" className="text-dark">Meet Planner</NavbarBrand>
                {/* <NavbarToggler onClick={toggleNavbar} className="mr-2" /> */}
                <Button 
                    outline 
                    style={{ color: 'black', marginLeft: 'auto', borderColor: 'black' }}
                    onClick={toggleHostMeetModal}>
                    Host a Meet
                </Button>
            </Navbar>

            <HostMeetModal
                modalState={hostMeetModalState}
                toggle={toggleHostMeetModal} />
        </header>
    );   
}
