import React from 'react'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { NavLink } from 'react-router-dom'
const menus = [
    {
        id: 1,
        path: "/",
        name: "File"
    },
    {
        id: 2,
        path: "/new-category",
        name: "New category"
    },
    {
        id: 3,
        path: "/service",
        name: "Service"
    },
    {
        id: 4,
        path: "/version",
        name: "Version"
    },
    {
        id: 5,
        path: "/about-me",
        name: "About me"
    }
]

const Navbar = () => {
    const [menu, setMenu] = React.useState(false);
    const [menuIndex, setMenuIndex] = React.useState(0);
    return (
        <div id="navbar-slide">
            <div className="menu">
                <IconButton color="primary" onClick={() => setMenu(!menu)} sx={{ padding: 2 }}>
                    {menu ? <CloseIcon /> : <MenuIcon />}
                </IconButton></div>
            <ul style={menu ? { display: 'block' } : null}>
                {menus.map(m =>
                    <li key={m.id} onClick={() => setMenuIndex(m.id)}><NavLink to={m.path}
                        style={menuIndex === m.id
                            ? {
                                color: '#FFF', backgroundColor: '#20C997', fontWeight: 'bold'
                            }
                            : null}
                    >{m.name}</NavLink></li>
                )}
            </ul>
        </div >
    );
};

export default Navbar;