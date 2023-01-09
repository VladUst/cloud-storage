import Navbar from "./navbar/Navbar";
import './app.scss';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Registration from "./authorization/Registration";
import Login from "./authorization/Login";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {auth} from "../actions/user";
import Disk from "./disk/Disk";
import Profile from "./profile/Profile";
function App() {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(auth());
    }, [])
  return (
      <BrowserRouter>
          <div className='app'>
              <div className="wrap">
                  <Navbar/>
                  {!isAuth ?
                      <Routes>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/registration" element={<Registration/>}/>
                          <Route
                              path="*"
                              element={<Navigate to="/login" replace />}
                          />
                      </Routes>
                      :
                      <Routes>
                          <Route exact path="/" element={<Disk/>}/>
                          <Route exact path="/profile" element={<Profile/>}/>
                          <Route
                              path="*"
                              element={<Navigate to="/" replace />}
                          />
                      </Routes>
                  }
              </div>
          </div>
      </BrowserRouter>
  );
}

export default App;
