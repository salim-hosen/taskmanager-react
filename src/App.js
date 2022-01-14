import React, {useState} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import Signin from "./Pages/Auth/Signin";
import ScrollToTop from "./Utils/ScrollToTop";
import { getUser, logoutUser } from "./redux/actions/userActions";
import NotFound from "./Pages/NotFound";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import ResetPassword from "./Pages/Auth/ResetPassword";
import VerifyEmail from "./Pages/Auth/VerifyEmail";
import ResendVerificationEmail from "./Pages/Auth/ResendVerificationEmail";
import { loadCartItems } from "./redux/actions/cartActions";
import AuthRoute from "./routes/AuthRoute";
import GuestRoute from "./routes/GuestRoute";
import Dashboard from './Pages/Dashboard/Dashboard'
import Project from './Pages/Dashboard/Project/Index'
import CreateProject from './Pages/Dashboard/Project/Create'
import EditProject from './Pages/Dashboard/Project/Edit'
import Task from './Pages/Dashboard/Task/Index'
import CreateTask from './Pages/Dashboard/Task/Create'
import EditTask from './Pages/Dashboard/Task/Edit'
import Worksheet from './Pages/Dashboard/Worksheet/Index'
import ViewProject from "./Pages/Dashboard/Project/View";
import Spinner from "./Components/Utils/Spinner";


function App() {

  const [loading, setLoading] = useState(true);

  React.useEffect(() => {

      store.dispatch(getUser())
        .then(res => {
          setLoading(false);
        }).catch(err => {
          setLoading(false);
        });

  }, [])

  return (
    loading ? 
    <div className="h-screen flex justify-center items-center py-5">
      <Spinner></Spinner>
    </div>
    :
    <div className="App">
      <Provider store={store}>
        <Router>
              <ScrollToTop></ScrollToTop>
              <Routes>
                
                <Route element={<GuestRoute/>}>
                  <Route exact path="/" element={<Signin />} />
                  <Route exact path="/sign-in" element={<Signin />} />
                  {/* <Route exact path="/sign-up" element={<Signup />} /> */}
                  {/* <Route exact path="/admin" element={<Signin />} /> */}
                  <Route exact path="/forgot-password" element={<ForgotPassword />} />
                  <Route exact path="/password/reset/:token" element={<ResetPassword />} />
                  <Route exact path="/verification/verify/:user" element={<VerifyEmail />} />
                  <Route exact path="/resend-verification" element={<ResendVerificationEmail />} />
                </Route>

                <Route element={<AuthRoute/>}>
                  <Route exact path="/dashboard" element={<Dashboard />} />
                  <Route exact path="/projects" element={<Project />} />
                  <Route exact path="/projects/create" element={<CreateProject />} />
                  <Route exact path="/projects/view/:id" element={<ViewProject />} />
                  <Route exact path="/projects/edit/:id" element={<EditProject />} />
                  <Route exact path="/tasks" element={<Task />} />
                  <Route exact path="/tasks/create/:id" element={<CreateTask />} />
                  <Route exact path="/tasks/edit/:id" element={<EditTask />} />
                  <Route exact path="/worksheets" element={<Worksheet />} />
                </Route>

                <Route path="*" element={<NotFound/>} />

              </Routes>
          </Router>
      </Provider>
    </div>
  );
}

export default App;
