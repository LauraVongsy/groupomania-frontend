import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {BiDislike, BiLike} from 'react-icons/bi';

const LikeInPost = ({likes, dislikes, usersLiked, usersDisliked, id}) => {

    const [likeInPost, setLikeInPost] = useState()
    const [dislikeInPost, setDislikeInPost] = useState()
    const [usersLikedArray, setUsersLikedArray] = useState([])
    const [usersDislikedArray, setUsersDislikedArray] = useState([])


    const parsedStorage = JSON.parse(localStorage.user)

    useEffect(() => {
        setLikeInPost(likes)
        setDislikeInPost(dislikes)
        setUsersLikedArray(usersLiked)
        setUsersDislikedArray(usersDisliked)
    }, [])

    const likePost = () => {
        if (usersDislikedArray.includes(parsedStorage.userId)) return
        const initialLoad = {
            postId: id,
            userId: parsedStorage.userId
        }

        let payload = usersLikedArray.includes(parsedStorage.userId) ?
            {...initialLoad, like: 0} : {...initialLoad, like: 1}

        axios({
            method: 'POST',
            mode: 'cors',
            headers: {
                Authorization: `token ${parsedStorage.token}`
            },
            url: `${process.env.REACT_APP_API_URL}api/post/${id}/like`,
            data: payload
        })
            .then(() => {
                if (!usersLikedArray.includes(parsedStorage.userId)) {
                    setLikeInPost(likeInPost + 1)
                    setUsersLikedArray(usersLikedArray => [...usersLikedArray, parsedStorage.userId])
                } else {
                    setLikeInPost(likeInPost - 1)
                    let newArray = [...usersLikedArray]
                    let index = newArray.indexOf(parsedStorage.userId)
                    newArray.splice(index, 1)
                    setUsersLikedArray([...newArray])
                }
            })
    }

    const dislikePost = () => {
        if (usersLikedArray.includes(parsedStorage.userId)) return
        const initialLoad = {
            postId: id,
            userId: parsedStorage.userId
        }

        let payload = usersDislikedArray.includes(parsedStorage.userId) ?
            {...initialLoad, like: 0} : {...initialLoad, like: -1}

        axios({
            method: 'POST',
            mode: 'cors',
            headers: {
                Authorization: `token ${parsedStorage.token}`
            },
            url: `${process.env.REACT_APP_API_URL}api/post/${id}/like`,
            data: payload
        })
            .then(() => {
                if (!usersDislikedArray.includes(parsedStorage.userId)) {
                    setDislikeInPost(dislikeInPost + 1)
                    setUsersDislikedArray(usersDislikedArray => [...usersDislikedArray, parsedStorage.userId])
                } else {
                    setDislikeInPost(dislikeInPost - 1)
                    let newArray = [...usersDislikedArray]
                    let index = newArray.indexOf(parsedStorage.userId)
                    newArray.splice(index, 1)
                    setUsersDislikedArray([...newArray])
                }
            })
    }

    return (
        <div className="likeBar">
            <div className="likes">
                <i className={usersLikedArray.includes(parsedStorage.userId) ? "colorLike" : "like"} onClick={likePost}><BiLike/></i>
                <p>{likeInPost} likes</p>
            </div>
            <div className="likes">
                <i className={usersDislikedArray.includes(parsedStorage.userId) ? "colorDislike" : "like"} onClick={dislikePost}><BiDislike/></i>
                <p>{dislikeInPost} dislikes</p>
            </div>
        </div>
    );
};

export default LikeInPost;