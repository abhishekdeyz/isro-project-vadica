import React, { Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import routeConfig from "./routes/routeConfig";
import Loader from "./components/Loader";
import Footer from "./components/Footer";
import VadicaBot from "./components/VadicaBot";
import { useDispatch, useSelector } from "react-redux";
import { setLogoutTimer } from "./apiServices/authApiServices";
import { logout } from "./redux/slices/authSlice";

// Dynamically load components
const components = {
  RegistrationSuccess: React.lazy(() =>
    import("./pages/auth/RegistrationSuccess")
  ),
  LoginPage: React.lazy(() => import("./pages/auth/LoginPage")),
  ForgotPassword: React.lazy(() => import("./pages/auth/ForgotPassword")),
  ResetPassword: React.lazy(() => import("./pages/auth/ResetPassword")),
  ChangePassword: React.lazy(() => import("./pages/auth/ChangePassword")),
  VerifyEmail: React.lazy(() => import("./pages/auth/VerifyEmail")),
  RegisterPage: React.lazy(() => import("./pages/auth/RegisterPage")),
  Unauthorized: React.lazy(() => import("./pages/auth/Unauthorized")),
  UserProfilePage: React.lazy(() => import("./pages/auth/UserProfilePage")),
  LandingPage: React.lazy(() => import("./pages/LandingPage")),
  PageNotFound: React.lazy(() => import("./pages/PageNotFound")),
};

const ComponentWrapper = ({ children }) => (
  <div style={{ minHeight: "calc(100vh - 60px - 80px)" }} className="">
    {children}
  </div>
);

const App = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      setLogoutTimer(token, dispatch, logout);
    }
  }, [token, dispatch]);

  const ScrollToTopOnRouteChange = () => {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    return null;
  };

  return (
    <Router>
      <ScrollToTopOnRouteChange />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{
          zIndex: 9999,
          marginBottom: "20px",
        }}
      />

      <div className="app-layout flex flex-col min-h-screen">
        <main className="flex-grow">
          <Suspense fallback={<Loader />}>
            <Routes>
              {routeConfig.map((route, index) => {
                const Component = components[route.component];
                return route.private ? (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <PrivateRoute allowedRoles={route.roles}>
                        <Navbar />
                        <VadicaBot />
                        <ComponentWrapper>
                          <Component />
                        </ComponentWrapper>
                        <Footer />
                      </PrivateRoute>
                    }
                  />
                ) : (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <>
                        <ComponentWrapper>
                          <Component />
                        </ComponentWrapper>
                      </>
                    }
                  />
                );
              })}
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
