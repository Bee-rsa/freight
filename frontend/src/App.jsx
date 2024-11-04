import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import FloatingShape from "./components/FloatingShape";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import DashboardPage from "./pages/DashboardPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import Pricing from "./pages/Pricing";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import Blog from "./pages/Blog";
import TruckingPage from "./pages/TruckingPage";
import UserHome from "./pages/userHome";
import WeightCalculator from "./pages/WeightCalculator";
import LoadingSpinner from "./components/LoadingSpinner";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import PropTypes from 'prop-types';

// Protected Route Component
const ProtectedRoute = ({ element }) => {
    const { user } = useAuthStore(); // Get user authentication status
    return user ? element : <Navigate to="/login" replace />;
};

// Main App Component
function App() {
    const { isCheckingAuth, checkAuth } = useAuthStore();
    const location = useLocation();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (isCheckingAuth) return <LoadingSpinner />;

    const showFloatingShapes = [
        '/login',
        '/signup',
        '/forgot-password',
        '/reset-password/:token',
        '/verify-email'
    ].includes(location.pathname);

    const containerStyle = location.pathname === '/' 
        ? 'min-h-screen bg-white flex items-center justify-center' 
        : 'min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden';

    return (
        <div className={containerStyle}>
            {showFloatingShapes && (
                <>
                    <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
                    <FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
                    <FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />
                </>
            )}

            <Routes>
                <Route path='/' element={<DashboardPage />} /> {/* Public access */}
                <Route path='/signup' element={<SignUpPage />} />
                <Route path='/login' element={<LoginPage />} /> {/* Login page */}
                <Route path='/verify-email' element={<EmailVerificationPage />} />
                <Route path='/forgot-password' element={<ForgotPasswordPage />} />
                <Route path='/reset-password/:token' element={<ResetPasswordPage />} />
                <Route path='/pricing' element={<Pricing />} />
                <Route path='/about-us' element={<AboutUs />} />
                <Route path='/privacy-policy' element={<PrivacyPolicy />} />
                <Route path='/terms-and-conditions' element={<TermsAndConditions />} />
                <Route path='/blog' element={<Blog />} />
                <Route path='/trucking-page' element={<TruckingPage />} />
                <Route path='/weight-calculator' element={<WeightCalculator />} />
                <Route path='/user-home' element={<ProtectedRoute element={<UserHome />} />} /> {/* Protected access */}
                <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>

            <Toaster />
        </div>
    );
}

// Define PropTypes for ProtectedRoute
ProtectedRoute.propTypes = {
    element: PropTypes.element.isRequired, // Ensure 'element' is a React element and is required
};

export default App;
