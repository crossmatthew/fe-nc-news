import { useParams } from 'react-router-dom';
import { getOneUser } from '../api/getUsers';
import { useEffect, useState } from 'react';
import { useContext } from "react";
import { UserContext } from "../Contexts/User-Context";
import ErrorHandler from './ErrorHandler';
import UserSignIn from './UserSignIn';
import LogOut from './LogOut';
const IndividualUser = () => {
    const { User } = useContext(UserContext)
    const { username } = useParams();
    const [ Error, setError ] = useState();
    const [ IsLoading, setIsLoading ] = useState(true)
    const [ LogUserIn, setLogUserIn ] = useState();
    useEffect(() => {
        getOneUser(username)
        .then((user) => {
            setLogUserIn(user)
            setIsLoading(false)
        })
        .catch((err) => {
            setError({ err })
        })
    }, [])
    if (Error) {
        return <ErrorHandler error={Error}/>
    }
    if (IsLoading) {
        return (
            <h1>Loading</h1>
        )
    }
    return (
        <>
        <section className='container'>
            <img src={LogUserIn.avatar_url}/>
            <p>{LogUserIn.username}</p>
            <p>{LogUserIn.name}</p>
            {LogUserIn.username === User ? <LogOut /> : <UserSignIn props={LogUserIn.username}/>}
        </section>
        </>
    )
};
export default IndividualUser;