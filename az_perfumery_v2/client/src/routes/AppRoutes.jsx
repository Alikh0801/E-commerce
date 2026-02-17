import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import VerifyEmail from '../pages/VerifyEmail';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import WishlistPage from '../pages/WishlistPage';
import CartPage from '../pages/CartPage';
import ProfilePage from '../pages/ProfilePage';

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
            },
            {
                path: "/verify-email",
                element: <VerifyEmail />
            },
            {
                path: "/forgot-password",
                element: <ForgotPassword />
            },
            {
                path: "/reset-password/:token",
                element: <ResetPassword />
            },
            {
                path: "/wishlist",
                element: <WishlistPage />
            },
            {
                path: "/cart",
                element: <CartPage />
            },
            {
                path: "/profil-page",
                element: <ProfilePage />
            }
        ]
    }
])
export default router;