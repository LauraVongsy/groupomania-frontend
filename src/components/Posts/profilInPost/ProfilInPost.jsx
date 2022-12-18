import React, {useEffect, useState} from 'react';
import axios from "axios";

const ProfilInPost = ({profilId}) => {
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        profilPicture: ""
    })
    // const [profil, setProfil] = useState(null)
    // const [isLoading, setLoading] = useState(true)
    const parsedStorage = JSON.parse(localStorage.user)

    useEffect(() => {
        getProfil()
    }, [])

    const getProfil = () => {
        axios({
            method: "get",
            mode: "cors",
            headers: {Authorization: `token ${parsedStorage.token}`},
            url: `${process.env.REACT_APP_API_URL}api/auth/${profilId}`,
        })
            .then((res) => {
                setState(prevState => ({
                    ...prevState,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    profilPicture: res.data.profilPicture
                }))
            })
            .catch(error => console.log(error))

    }

    // if (isLoading && !profil) {
    //     return <div>Loading...</div>
    // }
    return (
        <div className="profile-container">
            <img src={state.profilPicture} className="profilPicture" alt="votre profil"/>
            <p className="nom">{state.lastName}</p>
            <p className="prenom">{state.firstName}</p>
        </div>
    );
};

export default ProfilInPost;