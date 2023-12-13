import { useContext } from "react";
import { UserContext } from "../Contexts/User-Context";
const LogOut = () => {
    const { User, setUser } = useContext(UserContext)
    const handleSignOut = () => {
        setUser(null)
    }
    if (User) {
        return (
        <>
        <button onClick={handleSignOut}>Log Out</button>
        </>
        )
    }
    return (
        null
        )
};
export default LogOut;