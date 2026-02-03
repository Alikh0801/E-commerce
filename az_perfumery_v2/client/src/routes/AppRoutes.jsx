import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/register",
                element: <RegisterPage />
            }
        ]
    }
])
export default router;