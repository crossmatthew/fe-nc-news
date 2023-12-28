import { useContext } from "react";
import { UserContext } from "../Contexts/User-Context";
import LogOut from "./LogOut";
import { Link } from "react-router-dom";
const Header = () => {
    const { User } = useContext(UserContext)
    return (
        <header id="top-header">
        <Link to="/"><h1>FE NC NEWS</h1></Link>
        <div id="user-box">{User ? <p>Hello {User}</p> : null}
        <LogOut />
        </div>
        </header>
    );
};
export default Header;