import {auth, db} from "./firebase";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setUserState} from "./controller/Redux/authSlice";
import {addDoc} from "firebase/firestore";
import {collection, setDoc} from "firebase/firestore";
import {doc, getDocs} from "firebase/firestore";

export default function useUser() {
    const dispatch = useDispatch();


    useEffect(() => {
        // dispatch(setUserState({isLoading: true}));
        dispatch(setUserState({
            user: null,
            isLoading: true,
            name: null,
            error: null,
            from: "onChangeStart"
        }));
        const onChange = async (currentUser) => {
            let usernames = currentUser === null ? null : await getUsername(currentUser.email);
            let name = currentUser === null ? null : usernames.map((data) => {
                if (currentUser.email === data.email) {
                    const name = data.name;
                    // console.log(name)
                    return name;
                }
            })
            // console.log(currentUser, name, "found")
            dispatch(setUserState({
                user: currentUser === null ? null : currentUser.email,
                isLoading: false,
                name: name,
                error: null,
                from: "onChangeEnd"
            }))
        }

        return auth.onAuthStateChanged(onChange);
    }, [dispatch])

    const getUsername = async (email) => {
        try {
            const querySnapshot = await getDocs(collection(db, "users"));
            let userNames = []
            querySnapshot.forEach((doc) => {
                let numerate = doc.data();
                userNames.push(numerate);
            });
            return userNames
        } catch (e) {
            // console.log(e);
        }

    }

    const signInUser = async (email, password) => {
        dispatch(setUserState({
            isLoading: true,
            name: null,
            user: null,
            error: null,
            from: "SignIn"
        }));
        try {

            const credentials = await signInWithEmailAndPassword(auth, email, password);
            let usernames = credentials === null ? null : await getUsername(credentials.user.email);
            let name = credentials === null ? null : usernames.map((data) => {
                if (credentials.user.email === data.email) {
                    const name = data.name;
                    return name;
                }
            })
            dispatch(setUserState({
                user: credentials.user.email,
                isLoading: false,
                name: name,
                error: null,
                from: "SignInSuccess"
            }));
        } catch (e) {
            dispatch(setUserState({
                user: null,
                error: e.code,
                name: null,
                isLoading: false,
                from: "SignInFailiure"
            }));
            // console.log(e.code)
        }

    }

    const signUpUser = async (name, email, password) => {
        try {
            dispatch(setUserState({
                isLoading: true,
                name: null,
                user: null,
                error: null,
                from: "SignIn"
            }));
            let credentials = await createUserWithEmailAndPassword(auth, email, password);
            dispatch(setUserState({
                user: email,
                isLoading: false,
                name: name,
                error: null,
                from: "SignUpSuccess"
            }));


        } catch (e) {
            dispatch(setUserState({
                user: null,
                error: e.code,
                name: null,
                isLoading: false,
                from: "SignInFailiure"
            }));
            console.log(e);
        }
        try {
            const namesRef = collection(db, "users");
            const docRef = setDoc(doc(namesRef), {
                name: name,
                email: email
            })
        } catch (e) {

        }
    }

    const signOutUser = async () => {
        await signOut(auth);
        dispatch(setUserState({
            user: null,
            isLoading: false,
            name: null,
            error: null,
            from: "SignOutSuccess"
        }))

    }

    return {signInUser, signOutUser, signUpUser};
}
