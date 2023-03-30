import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Content = () => {
    return (
        <div id="content">
            <Outlet />
        </div>
    );
};
const Layout = () => {

    return (
        <div id="container">
            <Navbar />
            <Content />
        </div>
    );
}

export default Layout;