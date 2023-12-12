import { Link } from "react-router-dom";
const Nav = () => {
    return (
        <nav>
            <ul>
                <Link to="/"><li>Articles</li></Link>
            </ul>
        </nav>
    );
};
export default Nav;