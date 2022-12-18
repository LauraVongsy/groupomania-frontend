import React, {useEffect, useState} from 'react';
import axios from "axios";
import '../../styles/createPost.scss';
import ProfilInPost from "./profilInPost/ProfilInPost";


const CreatePost = () => {
    const [state, setState] = useState({
        message: ""
    })

    const [profil, setProfil] = useState('')
    useEffect(() => {
        getMyProfil();
    }, []);

    const [image, setImage] = useState(undefined)
    const [imageURL, setImageURL] = useState()
    const [show, setShow] = useState(false)

    useEffect(() => {
        if (!image) return;
        setImageURL(URL.createObjectURL(image))
    }, [image])

    const onImageChange = (e) => {
        setImage(...e.target.files)
        setShow(!show)
    }

    const handleChange = (e) => {
        const {id, value} = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const parsedStorage = JSON.parse(localStorage.user)
    const getMyProfil = () => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}api/auth/${parsedStorage.userId}`,
            mode: "cors",
            headers: {Authorization: `token ${parsedStorage.token}`}
        })
            .then(res => {
                setProfil(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const parsedStorage = JSON.parse(localStorage.user)

        axios({
            method: "post",
            mode: "cors",
            headers: {
                Authorization: `token ${parsedStorage.token}`,
                "Content-Type": "multipart/form-data",
            },
            url: `${process.env.REACT_APP_API_URL}api/post`,
            data: {
                userId: parsedStorage.userId,
                message: state.message,
                postPicture: image
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
        <div className="post-container">
            <div className="profile-container">
                <ProfilInPost profilId={parsedStorage.userId}/>
            </div>
            <form action="" onSubmit={handleSubmit}>
                <div className="message">
                    <textarea
                           rows="100"
                           cols="100"
                           wrap="hard"
                           name="message"
                           id="message" value={state.message} onChange={handleChange}/>
                </div>
                <div className="divPicture">
                    {show ? <img className="picture" src={imageURL} alt="votre fichier"/> : null }
                </div>
                <div className="fileInputContainer">
                    <label htmlFor="file" className="image-btn">Choisir une image</label>
                    <input className="fileInput" name="file" id="file" type="file" accept="image/*" onChange={onImageChange}/>
                </div>
                <input className="create-post-btn" type="submit" value="envoyer"/>
            </form>
        </div>
    );
};

export default CreatePost;