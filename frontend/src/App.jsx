import { useEffect } from 'react';
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query"; // Import necessary components from React Query

// Import your other components and pages
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
import Operations from "./pages/Operations";
import FreightForwarders from "./pages/FreightForwarders";
import UserHome from "./pages/userHome";
import MyShipments from "./pages/MyShipments"
import TrackMyOrder from "./pages/TrackMyOrder"
import OperatorHome from "./pages/OperatorHome";
import WeightCalculator from "./pages/WeightCalculator";
import LoadingSpinner from "./components/LoadingSpinner";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useAuthsStore } from "./store/authsStore";
import PropTypes from 'prop-types';
import OverviewPage from "./page/OverviewPage";
import ProductsPage from "./page/ProductsPage";
import UsersPage from "./page/UsersPage";
import SalesPage from "./page/SalesPage";
import OrdersPage from "./page/OrdersPage";
import AddServices from "./page/AddServices";
import AnalyticsPage from "./page/AnalyticsPage";
import SettingsPage from "./page/SettingsPage";
import ViewProfile from "./page/ViewProfile";

// Create the QueryClient instance
const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ element, role }) => {
    const { user, isCheckingAuth } = useAuthStore();
    const { operator } = useAuthsStore();

    if (isCheckingAuth) return <LoadingSpinner />; // Show loading spinner while checking auth

    if (role === "user") {
        return user ? element : <Navigate to="/login" replace />;
    } else if (role === "operator") {
        return operator ? element : <Navigate to="/operator-login" replace />;
    }
    return <Navigate to="/" replace />;
};

// Define PropTypes for ProtectedRoute
ProtectedRoute.propTypes = {
    element: PropTypes.element.isRequired,
    role: PropTypes.string.isRequired
};

// Main App Component
function App() {
    const { isCheckingAuth, checkAuth } = useAuthStore();
    const location = useLocation(); // To get the current route path

    useEffect(() => {
        checkAuth(); // Check authentication state on mount
    }, [checkAuth]);

    if (isCheckingAuth) return <LoadingSpinner />; // Ensure loading spinner shows while checking auth

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
        <QueryClientProvider client={queryClient}> {/* Wrap your app here */}
            <div className={containerStyle}>
                {showFloatingShapes && (
                    <>
                        <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
                        <FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
                        <FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />
                    </>
                )}

                <Routes>
                    {/* Public Routes */}
                    <Route path='/' element={<DashboardPage />} />
                    <Route path='/signup' element={<SignUpPage />} />
                    <Route path='/login' element={<LoginPage />} />
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
                    <Route path='/products' element={<ProductsPage />} />
                    <Route path='/users' element={<UsersPage />} />
                    <Route path='/sales' element={<SalesPage />} />
                    <Route path='/my-shipments' element={<MyShipments />} />
                    <Route path='/track-my-order' element={<TrackMyOrder />} />
                    <Route path='/orders' element={<OrdersPage />} />
                    <Route path='/analytics' element={<AnalyticsPage />} />
                    <Route path='/settings' element={<SettingsPage />} />

                    {/* Protected routes for operator */}
                    <Route path='/operator-home' element={<ProtectedRoute element={<OperatorHome />} role="operator" />} />
                    <Route path="/overview" element={<ProtectedRoute element={<OverviewPage />} role="operator" />} />
                    <Route path="/add-services" element={<ProtectedRoute element={<AddServices />} role="operator" />} />
                    <Route path="/view-profile" element={<ProtectedRoute element={<ViewProfile />} role="operator" />} />
        
                    {/* Protected routes for user */}
                    <Route path='/user-home' element={<ProtectedRoute element={<UserHome />} role="user" />} />
                    <Route path='/my-shipments' element={<ProtectedRoute element={<MyShipments />} role="user" />} />
                    <Route path='/track-my-order' element={<ProtectedRoute element={<TrackMyOrder />} role="user" />} />

                    {/* Fallback route */}
                    <Route path='*' element={<Navigate to='/' replace />} />
                </Routes>

                <Toaster />
            </div>
        </QueryClientProvider>
    );
}

export default App;
