import { useParams } from 'react-router-dom';
import { getOneUser } from '../api/getUsers';
import { useEffect, useState } from 'react';
import UserSignIn from './UserSignIn';
const IndividualUser = () => {
    const { username } = useParams();
    const [ IsLoading, setIsLoading ] = useState(true)
    const [ User, setUser ] = useState();
    useEffect(() => {
        getOneUser(username)
        .then((user) => {
            setUser(user)
            setIsLoading(false)
        })
    }, [])
    if (IsLoading) {
        return (
            <h1>Loading</h1>
        )
    }
    return (
        <>
        <section className='container'>
            <img src={User.avatar_url}/>
            <p>{User.username}</p>
            <p>{User.name}</p>
            <UserSignIn props={User.username}/>
        </section>
        </>
    )
};
export default IndividualUser;