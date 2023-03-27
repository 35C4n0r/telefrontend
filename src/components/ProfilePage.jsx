import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
} from "@material-tailwind/react";
import {useSelector} from "react-redux";


/***
 * This component provides the Profile Page of Our Project, served on "/profile". Can only be accessed if the User is Logged In.
 * @returns {JSX.Element}
 * @constructor
 */
export default function ProfilePage() {

    const {user, name} = useSelector((store) => store.auth);

    return (
        <Card className="w-9/12 mx-auto mt-28 ">
            <CardHeader floated={false} className="h-80" color={"orange"} >
                    <Typography variant={"h1"} color={"white"} className="mt-6 flex justify-center gap-1 md:text-9xl text-3xl font-normal text-center">
                        {name}
                    </Typography>
            </CardHeader>
            <CardBody className="text-center">
                <Typography variant="h4" color="blue-gray" className="mb-2">
                    {user}
                </Typography>
                <Typography color="blue" className="font-medium" textGradient>
                    Position
                </Typography>
            </CardBody>
            <CardFooter className="flex justify-center gap-7 pt-2">
                <Tooltip content="Like">
                    <Typography
                        as="a"
                        href="#facebook"
                        variant="lead"
                        color="blue"
                        textGradient
                    >
                        <i className="fab fa-facebook" />
                    </Typography>
                </Tooltip>
                <Tooltip content="Follow">
                    <Typography
                        as="a"
                        href="#twitter"
                        variant="lead"
                        color="light-blue"
                        textGradient
                    >
                        <i className="fab fa-twitter" />
                    </Typography>
                </Tooltip>
                <Tooltip content="Follow">
                    <Typography
                        as="a"
                        href="#instagram"
                        variant="lead"
                        color="purple"
                        textGradient
                    >
                        <i className="fab fa-instagram" />
                    </Typography>
                </Tooltip>
            </CardFooter>
        </Card>
    );
}
