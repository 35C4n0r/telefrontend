import './App.css';
import UserNavbar from "./components/UserNavbar";
import SignUpPage from "./components/SignUpPage";
import LoginPage from "./components/LoginPage";
import ProfilePage from "./components/ProfilePage";
import DashboardPage from "./components/DashboardPage";
import {Navigate, Route, Routes} from "react-router-dom";
import useUser from "./FirebaseAuth";
import {useSelector} from "react-redux";
import Spinner from "./components/Spinner";


function App() {
    useUser();
    const {isSignedIn, isLoading} = useSelector((store) => store.auth);

    return (
        <div className="App">
            <UserNavbar/>

            <div className={"mt-2 p-4"}><Routes>
                <Route exact path={"/"} element={
                    isLoading ? <div className={"mt-32"}><Spinner/></div> :
                        isSignedIn ? <DashboardPage/> : <Navigate to="/login"/>
                }/>

                <Route exact path={"/profile"} element={
                    isLoading ? <div className={"mt-32"}><Spinner/></div> : (isSignedIn ? <ProfilePage/> :
                        <Navigate to="/login"/>)
                }/>

                <Route exact path={"/login"} element={<LoginPage/>}/>
                <Route exact path={"/signup"} element={<SignUpPage/>}/>
            </Routes>
            </div>

        </div>
    );
}

export default App;
