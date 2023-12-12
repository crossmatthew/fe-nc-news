import { useState, useEffect } from "react";
import { getUsers } from "../api/getUsers";
import { Link } from 'react-router-dom';
const Users = () => {
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
    const userMap = Users.map((user) => {
        const userLink = `/users/${user.username}`
        return <Link to={userLink}>
                <li className='container' key={user.username}>
                    <img src={user.avatar_url}/>
                    <p>{user.username}</p>
                    <p>{user.name}</p>
                </li>
            </Link>
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