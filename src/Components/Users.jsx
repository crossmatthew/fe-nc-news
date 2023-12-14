import { useState, useEffect } from "react";
import { getUsers } from "../api/getUsers";
import { Link } from 'react-router-dom';
import UserSignIn from "./UserSignIn";
import { useContext } from "react";
import { UserContext } from "../Contexts/User-Context";
import LogOut from "./LogOut";
const Users = () => {
    const { User, setUser } = useContext(UserContext)
    const [ Users, setUsers ] = useState()
    const [ IsLoading, setIsLoading ] = useState(true)
    useEffect(() => {
        getUsers()
        .then((users) => {
            setUsers(users)
            setIsLoading(false)
        })
    }, [])
    if (IsLoading) {
        return (
            <h1>Loading</h1>
        )
    }
    const userMap = Users.map((eachUser) => {
        const userLink = `/users/${eachUser.username}`
        return <>
                <li className='container' key={eachUser.username}>
                    <Link to={userLink}>
                    <img src={eachUser.avatar_url}/>
                    <p>{eachUser.username}</p>
                    <p>{eachUser.name}</p>
            </Link>
            {eachUser.username === User ? <LogOut /> : <UserSignIn props={eachUser.username}/>}
                </li>
        </>
    })
    return (
        <>
        <section>
        <ul>
            {userMap}
        </ul>
        </section>
        </>
    );
};
export default Users;