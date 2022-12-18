import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "../../styles/updatePost.scss";


const UpdatePost = ({post}) => {
    console.log(post)

    const [state, setState] = useState({
        message: post.message
    })

    const parsedStorage = JSON.parse(localStorage.user)

    const handleChange = (e) => {
        const {id, value} = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

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

    const handleModification = () => {
        axios({
            method: "PUT",
            mode: "cors",
            headers: {
                Authorization: `token ${parsedStorage.token}`,
                "Content-Type": "multipart/form-data",
            },
            url: `${process.env.REACT_APP_API_URL}api/post/${post._id}`,
            data: {
                userId: parsedStorage.userId,
                message: state.message,
                postPicture: image
            }
        })
            .then(window.location = "/trending")
    }

    return (
        <div>
            <div className="modify-post">
                <h3>Modifiez votre post ici:</h3>
                <textarea className="modify-textarea" name="message" id="message" value={state.message}
                    onChange={handleChange} cols="50" rows="50"/>
                <div className="picture">
                    {show ? <img id="update-pic" src={imageURL} alt="votre fichier"/> : null}
                    <label htmlFor="file"  className="image-btn">Choisir une image</label>
                    <input className="fileInput" name="file" id="file" type="file" accept="image/*" onChange={onImageChange}/>
                </div>
                <button className="modify-btn" onClick={handleModification}>Envoyer la modification</button>
            </div>
        </div>
    );
}


export default UpdatePost;