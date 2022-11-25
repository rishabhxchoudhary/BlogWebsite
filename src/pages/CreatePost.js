import React, { useEffect, useState } from "react";
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from "../firebase-config";
import { useNavigate } from 'react-router-dom';

function CreatePost({ isAuth }) {
    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");

    const postCollectionRef = collection(db,"posts");

    let navigate = useNavigate();

    const createPost = async ()=>{
        await addDoc(postCollectionRef, {title, postText, author : {name : auth.currentUser.displayName , id: auth.currentUser.uid }})
        navigate("/");
    }

    useEffect(()=>{
        if (!isAuth) {
            navigate("/login");
        }
    },[]);
    return (
        <div className="createPostPage">
            <div className="cpContainer">
                <h1>Create a POST</h1>
                <div className="inputGp">
                    <label>Title :</label>
                    <input type="text" placeholder="Title.." onChange={(e)=>{setTitle(e.target.value)}}/>
                </div>
                <div className="inputGp">
                    <label htmlFor="">Post :</label>
                    <textarea placeholder="Post.." onChange={(e)=>{setPostText(e.target.value)}}></textarea>
                </div>
                <button onClick={createPost}>Submit Post</button>
            </div>
        </div>
    ); 
}

export default CreatePost;