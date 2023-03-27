import React, {useEffect, useRef} from "react";
import {
    Navbar,
    MobileNav,
    Typography,
    IconButton,

} from "@material-tailwind/react";
import './Navbar.css'
import useUser from "../FirebaseAuth";
import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";


/***
 * This is the component responsible for the entire functioning of the Navbar.
 * @returns {JSX.Element}
 * @constructor
 */
export default function UserNavbar() {

    const userState = useUser()
    const {isSignedIn, isLoading} = useSelector((store) => store.auth);

    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    const navigate = useNavigate();

    function handleSuccessfulSignOut() {
        setTimeout(() => {
            if (isSignedIn === false) {
                navigate("/", {replace: true});
            }
        }, 3000);
        return <></>
    }

    async function handleSignOut() {
        await userState.signOutUser();
    }

    const navListLoggedOutUser = (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal md:text-2xl text-lg"
            >
                <Link to="/login" className="flex items-center">
                    Login
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal md:text-2xl text-lg"
            >
                <Link to="/signup" className="flex items-center">
                    SignUp
                </Link>
            </Typography>
        </ul>
    );

    const navListLoggedInUser = (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal md:text-2xl text-lg"
            >
                <Link to="" className="flex items-center">
                    Dashboard
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal md:text-2xl text-lg"
            >
                <Link to="/profile" className="flex items-center">
                    Profile
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal md:text-2xl text-lg"
            >
                <Link to="#" onClick={handleSignOut} className="flex items-center">
                    SignOut
                </Link>
            </Typography>
        </ul>
    );

    return (
        <>
            <Navbar className="fixed left-0 right-0 z-10 mx-auto py-2 px-4 lg:px-8 lg:py-4 mt-4 nav-personal">
                <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
                    <Typography
                        as="a"
                        href="#"
                        className="mr-4 cursor-pointer py-1.5 md:text-3xl text-lg font-bold"
                    >
                        TeleBoard
                    </Typography>
                    <div className="flex items-center gap-4">
                        <div
                            className="mr-4 hidden lg:block ">{isSignedIn === true ? navListLoggedInUser : navListLoggedOutUser}</div>
                        <IconButton
                            variant="text"
                            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                            ripple={false}
                            onClick={() => setOpenNav(!openNav)}
                        >
                            {openNav ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </IconButton>
                    </div>
                </div>
                <MobileNav open={openNav}>
                    {isSignedIn === true ? navListLoggedInUser : navListLoggedOutUser}
                </MobileNav>
            </Navbar>
        </>
    );
}