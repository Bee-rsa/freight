import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import FloatingShape from "./components/FloatingShape";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import OperatorLoginPage from "./pages/OperatorLoginPage";
import OperatorSignUpPage from "./pages/OperatorSignUpPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import OperatorEmailVerificationPage from "./pages/OperatorEmailVerificationPage";
import DashboardPage from "./pages/DashboardPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import Pricing from "./pages/Pricing";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import Blog from "./pages/Blog";
import TruckingPage from "./pages/TruckingPage";
import OceanFreight from "./pages/OceanFreight";
import CourierServices from "./pages/CourierServices";
import AirFreight from "./pages/AirFreight";
import Warehousing from "./pages/Warehousing";
import RailFreight from "./pages/RailFreight";
import Operations from "./pages/operations";
import FreightForwarders from "./pages/FreightForwarders";
import UserHome from "./pages/userHome";
import OperatorHome from "./pages/operatorHome";
import WeightCalculator from "./pages/WeightCalculator";
import LoadingSpinner from "./components/LoadingSpinner";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useAuthsStore } from "./store/authsStore";
import { useEffect } from "react";
import PropTypes from 'prop-types';

// Protected Route Component
const ProtectedRoute = ({ element, role }) => {
    const { user } = useAuthStore();
    const { operator } = useAuthsStore();

    if (role === "user") {
        return user ? element : <Navigate to="/login" replace />;
    } else if (role === "operator") {
        return operator ? element : <Navigate to="/operator-login" replace />;
    }
    return <Navigate to="/" replace />;
};

// Define PropTypes for ProtectedRoute
ProtectedRoute.propTypes = {
    element: PropTypes.element.isRequired, // Ensure 'element' is a React element and is required
    role: PropTypes.string.isRequired // Ensure 'role' is a string and is required
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
                <Route path='/operator-verify-email' element={<OperatorEmailVerificationPage />} />
                <Route path='/forgot-password' element={<ForgotPasswordPage />} />
                <Route path='/reset-password/:token' element={<ResetPasswordPage />} />
                <Route path='/pricing' element={<Pricing />} />
                <Route path='/about-us' element={<AboutUs />} />
                <Route path='/privacy-policy' element={<PrivacyPolicy />} />
                <Route path='/terms-and-conditions' element={<TermsAndConditions />} />
                <Route path='/blog' element={<Blog />} />
                <Route path='/trucking-page' element={<TruckingPage />} />
                <Route path='/ocean-freight' element={<OceanFreight />} />
                <Route path='/courier-services' element={<CourierServices />} />
                <Route path='/air-freight' element={<AirFreight />} />
                <Route path='/warehousing' element={<Warehousing />} />
                <Route path='/rail-freight' element={<RailFreight />} />
                <Route path='/operations' element={<Operations />} />
                <Route path='/operator-login' element={<OperatorLoginPage />} />
                <Route path='/operator-signup' element={<OperatorSignUpPage />} />
                <Route path='/freight-forwarders' element={<FreightForwarders />} />
                <Route path='/weight-calculator' element={<WeightCalculator />} />

                {/* Protected routes for operator */}
                <Route path='/operator-home' element={<ProtectedRoute element={<OperatorHome />} role="operator" />} />
    
                {/* Protected routes for user */}
                <Route path='/user-home' element={<ProtectedRoute element={<UserHome />} role="user" />} />

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
