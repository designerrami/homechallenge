import "../../App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import ILoading from "../components/Loading";
import WalletDashboard from "../pages/WalletDashboard";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/authSlice";
import { useCookies } from "react-cookie";
import platform from "platform";
import axios from "axios";

function Navigation() {
  // check token
  const [cookies, setCookie] = useCookies(["auth"]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();


  // check if before user loged
  const checkAsyncLogin = async (token, browser) => {
    setLoading(true);
    try {
      const headers = { "Content-Type": "application/json" };
      await axios
        .get(
          "https://site.test/homechallenge/back/?token=" +
            token +
            "&browser=" +
            browser,
          { headers }
        )
        .then((response) => {
          if (response.status === 200 && response.data.message === "success") {
            const checkAuth = cookies.auth;
            if (checkAuth) {
              dispatch(setAuth(checkAuth));
            }
          } else {
          }
        })
        .catch((error) => {});
    } catch (error) {}
    setLoading(false);
  };

  // check from cookie user is auth or not
  useEffect(() => {
    const token = cookies.auth ? cookies.auth.token : undefined;
    checkAsyncLogin(token, platform.description);
  }, []);

  const isAuth = useSelector((state) => state.auth.isAuth); // from redux check to isauth or not
  return (
    <BrowserRouter>
      <Routes>
        {loading ? (
          <Route path="/" element={<ILoading />} />
        ) : !isAuth ? (
          <Route path="/" element={<Login />} />
        ) : (
          <Route path="/" element={<WalletDashboard />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default Navigation;
