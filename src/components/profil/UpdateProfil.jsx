import React, {useState, useEffect} from 'react';
import axios from "axios";

const UpdateProfil = () => {

    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        bio: "",
        profilPicture:"",
        image:undefined
    })


    const onImageChange = (e) => {
        setState(prevState => ({
            ...prevState,
            profilPicture: URL.createObjectURL(e.target.files[0]),
            image: e.target.files[0]
        }))
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const getUser = () => {
        const parsedStorage = JSON.parse(localStorage.user)
        axios({
            method: "get",
            mode: "cors",
            headers: {
                Authorization: `token ${parsedStorage.token}`,
            },
            url: `${process.env.REACT_APP_API_URL}api/auth/${parsedStorage.userId}`
        })
            .then((res) => {
                setState(prevState => ({
                    ...prevState,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    bio: res.data.bio,
                    profilPicture: res.data.profilPicture
                }))
            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        getUser()
    }, [])

    const handleDelete = (e) => {
        e.preventDefault();
        const parsedStorage = JSON.parse(localStorage.user)
        axios({
            method: "delete",
            mode: "cors",
            headers: {
                Authorization: `token ${parsedStorage.token}`,
            },
            url: `${process.env.REACT_APP_API_URL}api/auth/${parsedStorage.userId}`
        })
            .then(() => {
                localStorage.clear();
                window.location = "/"

            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const parsedStorage = JSON.parse(localStorage.user)
        const updateObject = {
            userId: parsedStorage.userId,
            firstName: state.firstName,
            lastName: state.lastName,
            bio: state.bio,
        }

        axios({
            method: "put",
            mode: "cors",
            headers: {
                Authorization: `token ${parsedStorage.token}`,
                "Content-Type": "multipart/form-data"
            },
            url: `${process.env.REACT_APP_API_URL}api/auth/${parsedStorage.userId}`,
            data: {
                ...updateObject,
                profilPicture: state.image
            }
        })
            .then((res) => {
                if (res.data.errors) {
                    console.log(res.data.errors)
                } else {
                    window.location = "/trending"
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className="profil-container">
            <h1 className="title">Votre profil</h1>

            <form action="" onSubmit={handleSubmit} className="profil-form-container">

                <div className="form-column">
                    <label htmlFor="firstName">Votre prénom</label>
                    <input type="text"
                           name="firstName"
                           id="prenom"
                           onChange={handleChange}
                           value={state.firstName}
                    />
                    <label htmlFor="lastName">Votre nom</label>
                    <input type="text"
                           name="lastName"
                           id="nom"
                           onChange={handleChange}
                           value={state.lastName}
                    />
                    <label htmlFor="bio">Votre description</label>
                    <textarea className="textAreaBio" name="bio" id="bio" onChange={handleChange} value={state.bio}/>
                </div>
                <div className="photo-profil">
                    <h3>Votre photo de profil</h3>
                    <img src={state.profilPicture} alt="avatar" className="profil-pic"/>
                    {/*{show ? <img id="profil-pic" src={imageURL} alt="votre fichier"/> : null}*/}
                    <br/>
                    <label htmlFor="file" className="image-btn">Choisir une image</label>
                    <input id="file" type="file" accept="image/*" onChange={onImageChange}/>

                </div>
            </form>
            <div className="profil-buttons">
                <button className="delete-btn" onClick={handleDelete}>Supprimer mon compte</button>
               <button onClick={handleSubmit} id="sendBtn">enregistrer mon profil</button>
            </div>

        </div>
    );
};

export default UpdateProfil;