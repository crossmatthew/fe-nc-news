import { Link } from "react-router-dom";
const Nav = () => {
    return (
        <nav id="top-nav">
            <ul>
                <Link to="/"><li>Articles</li></Link>
                <Link to="/topics"><li>Topics</li></Link>
                <Link to="/users"><li>Users</li></Link>
            </ul>
        </nav>
    );
};
export default Nav;