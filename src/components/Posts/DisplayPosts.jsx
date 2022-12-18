import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ProfilInPost from "./profilInPost/ProfilInPost";
import LikeInPost from "./likeInPost/LikeInPost";
import UpdatePost from "./UpdatePost";

const DisplayPosts = () => {
    const parsedStorage = JSON.parse(localStorage.user)
    const [posts, getPosts] = useState('');
    const [isLoading, setLoading] = useState(true)
    const [isShown, setIsShown] = useState(false)
    const [isIndex, setIsIndex] = useState(null)

    useEffect(() => {
        getAllPosts()
    }, [isLoading])

    const reload = () => {
        setLoading(true)
    }

    const getAllPosts = () => {
        axios({
            method: "get",
            mode: "cors",
            url: `${process.env.REACT_APP_API_URL}api/post`,
            headers: {Authorization: `token ${parsedStorage.token}`}
        })
            .then(res => {
                getPosts(res.data)
                setLoading(false)
            })
            .catch(err => console.log(err))
    };
    while (isLoading) {
        return <div>Loading...</div>
    }
    const displayPost = () => {
        if (posts.length > 0) {
            return (posts.map((post, index) => {
                const handleShow = () => {
                    setIsShown(current => !current)
                    setIsIndex(index)
                }
                const deletePost = () => {
                    axios({
                        method: "DELETE",
                        mode: "cors",
                        headers: {
                            Authorization: `token ${parsedStorage.token}`
                        },
                        url: `${process.env.REACT_APP_API_URL}api/post/${post._id}`,
                        data: {id: post._id}
                    })
                        .then(window.location = "/trending")
                }

                return (
                    <div className="post-container" key={post._id}>
                        <ProfilInPost className="profile-container" key={post._id} profilId={post.userId}/>
                        <div className="messagePost">{post.message}</div>
                        {post.postPicture ?
                            <img className="picture" src={post.postPicture} alt=""/> : null}
                        <div>
                            <LikeInPost likes={post.likes} dislikes={post.dislikes} usersLiked={post.usersLiked} usersDisliked={post.usersDisliked} id={post._id} />
                            {/*<DislikeInPost post={post} reload={reload}/>*/}
                        </div>
                        {(parsedStorage.userId === post.userId || parsedStorage.isAdmin === true) &&
                        <div>
                            <button className="modifierBtn" onClick={handleShow}>Modifier</button>
                            <button className="deleteBtn" onClick={deletePost}>Supprimer</button>
                            {isShown && index === isIndex && <UpdatePost post={post}/>}
                        </div>}
                        <p className="timestamp">Publié le : {new Date(post.date).toLocaleDateString()}</p>
                    </div>
                )

            }))
        } else {
            return (
                <div>
                    <p>
                        Pas de post à afficher!
                    </p>
                </div>
            )
        }
    }
    return (
        <div>
            {displayPost()}
        </div>
    );
}

export default DisplayPosts;