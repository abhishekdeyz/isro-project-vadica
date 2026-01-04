const routeConfig = [
  { path: "/", component: "LandingPage", private: true },
  
  {
    path: "/user-profile/:user_id",
    component: "UserProfilePage",
    private: true,
    roles: ["admin", "manager", "user"],
  },
  { path: "/login", component: "LoginPage", private: false },
  { path: "/forget-password", component: "ForgotPassword", private: false },
  {
    path: "/reset-password/:token",
    component: "ResetPassword",
    private: false,
  },
  { path: "/change-password", component: "ChangePassword", private: true },
  { path: "/verify-email", component: "VerifyEmail", private: false },
  { path: "/register", component: "RegisterPage", private: false },
  { path: "/unauthorized", component: "Unauthorized", private: false },
  {
    path: "/registration-success",
    component: "RegistrationSuccess",
    private: false,
  },
  { path: "*", component: "PageNotFound", private: false },
];

export default routeConfig;
