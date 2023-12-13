import { useContext } from "react";
import { UserContext } from "../Contexts/User-Context";
const UserSignIn = (props) => {
    const username = props.props
    const { setUser } = useContext(UserContext)
    const handleSignIn = () => {
        setUser(username)
    }
    return (
    <button onClick={handleSignIn}>Log In</button>
    )
};
export default UserSignIn;