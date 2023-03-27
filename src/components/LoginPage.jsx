import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import useUser from "../FirebaseAuth";
import {useSelector} from "react-redux";


/***
 * this Component is the LoginPage of our Project, served on "/login". On Successful login it redirects to the Dashboard.
 * @returns {JSX.Element}
 * @constructor
 */
export default function LoginPage() {

    const useUserState = useUser();
    const {isSignedIn, error} = useSelector((store) => store.auth);

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
        visible: false
    });

    function handleVisibility(){
        const newState = {...credentials, visible: !credentials.visible};
        setCredentials(newState)
    }

    const navigate = useNavigate();

    function handleSuccessfulSignIn() {
        setTimeout(() => {
            if (isSignedIn) {
                navigate("/", {replace: true});
            }
        }, 2000);
        return <Typography color={"light-green"}>"Successful Login Redirecting..."</Typography>
    }

    function handleCredentialsChange(event) {
        let field = event.target.name;
        const newState = {...credentials, [field]: event.target.value};
        setCredentials(newState);
    }

    async function handleLogin() {
        await useUserState.signInUser(credentials.email, credentials.password);

    }

    return (
        <Card color="transparent" shadow={false} className={"mt-36"}>
            <Typography variant="h4" color="blue-gray">
                Log In
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Enter your details to Login.
            </Typography>
            <form className="mt-10 w-80 max-w-screen-lg sm:w-96 ml-auto mr-auto">
                <div className="mb-4 flex flex-col gap-6 ">
                    <Input name={"email"} onChange={handleCredentialsChange} size="lg" label="Email"/>
                    <Input name={"password"} onChange={handleCredentialsChange} type={credentials.visible ? "text" : "password"} size="lg"
                           label="Password" icon={<i onClick={handleVisibility} className={credentials.visible ?"fas fa-eye" : "fas fa-eye-slash"}/>}/>
                </div>
                <Button onClick={handleLogin} className="mt-10" fullWidth>
                    Sign In
                </Button>

                <div className={"mt-9"}>
                    {isSignedIn ? handleSuccessfulSignIn() : error === null ? "" : <Typography color={"red"}>{error.toUpperCase().split("/")[1]}</Typography>}
                </div>


                <Typography color="gray" className="mt-4 text-center font-normal">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="font-medium text-blue-500 transition-colors hover:text-blue-700"
                    >
                        Sign Up
                    </Link>
                </Typography>
            </form>

        </Card>
    );
}