import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import {useState} from "react";
import useUser from "../FirebaseAuth";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

/***
 * this Component is the SignUp of our Project, served on "/register", On Successful SignUp it redirects to the Dashboard.
 * @returns {JSX.Element}
 * @constructor
 */
export default function SignUpPage() {

    const useUserState = useUser();

    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        visible: false
    })

    const navigate = useNavigate();

    function handleVisibility(){
        const newState = {...credentials, visible: !credentials.visible};
        setCredentials(newState);
    }

    const {isSignedIn, error} = useSelector((store) => store.auth);

    function handleSuccessfulSignUp() {
        setTimeout(() => {
            if (isSignedIn) {
                navigate("/", {replace: true});
            }
        }, 2000);
        return <Typography color={"light-green"}>"Successful Signed Up, Redirecting..."</Typography>
    }


    function handleCredentialsChange(event){
        let field = event.target.name;
        const newState = {...credentials, [field]: event.target.value};
        setCredentials(newState);
    }

    async function handleRegistration() {
        console.log("I was called")
        await useUserState.signUpUser(credentials.name, credentials.email, credentials.password);

    }


    return (
        <Card color="transparent" shadow={false} className={"mt-32"}>
            <Typography variant="h4" color="blue-gray">
                Sign Up
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Enter your details to register.
            </Typography>
            <form className="mt-10  w-80 max-w-screen-lg sm:w-96 ml-auto mr-auto">
                <div className="mb-4 flex flex-col gap-6 ">
                    <Input onChange={handleCredentialsChange} name={"name"} size="lg" label="Name" />
                    <Input onChange={handleCredentialsChange} name={"email"} size="lg" label="Email" />
                    <Input onChange={handleCredentialsChange} name={"password"} type={ credentials.visible ? "text" : "password"} size="lg" label="Password" icon={<i onClick={handleVisibility} className={credentials.visible ?"fas fa-eye" : "fas fa-eye-slash"}/>}/>
                </div>
                <Checkbox
                    label={
                        (
                            <Typography
                                variant="small"
                                color="gray"
                                className="flex items-center font-normal"
                            >
                                I agree the
                                <Link
                                    to="/"
                                    className="font-medium transition-colors hover:text-blue-500"
                                >
                                    &nbsp;Terms and Conditions
                                </Link>
                            </Typography>
                        )
                    }
                    containerProps={{ className: "-ml-2.5" }}
                />
                <Button onClick={handleRegistration} className="mt-6" fullWidth>
                    Register
                </Button>

                <div className={"mt-9"}>
                    {isSignedIn ? handleSuccessfulSignUp() : error === null ? "" : <Typography color={"red"}>{error.toUpperCase().split("/")[1]}</Typography>}
                </div>

                <Typography color="gray" className="mt-4 text-center font-normal">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-medium text-blue-500 transition-colors hover:text-blue-700"
                    >
                        Sign In
                    </Link>
                </Typography>
            </form>
        </Card>
    );
}