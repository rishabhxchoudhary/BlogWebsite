import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from  'firebase/firestore';
import { auth, db } from "../firebase-config";

function Home({ isAuth }) {

    const [postLists, setPostLists] = useState([]);

    const postCollectionRef = collection(db,"posts");

    useEffect(()=>{
        const getPosts = async () =>{
            const data = await getDocs(postCollectionRef);
            setPostLists(data.docs.map((doc)=> ({...doc.data(), id : doc.id } )));
        }

        getPosts();
    });

    const deletePost = async (id)=>{
        const postDoc = doc(db,"posts", id);
        await deleteDoc(postDoc);
    }

    return (
        <div className="homePage">
            {
                postLists.map((post) => {
                    return (
                        <div className="post">
                            <div className="postheader">
                                <div className="title">
                                    <h1>{post.title}</h1>
                                </div>

                                { isAuth && post.author.id===auth.currentUser.uid && <div className="deletePost">
                                    <button onClick={()=>{deletePost(post.id)}}>&#128465;</button>
                                </div>}
                            </div>
                            <div className="postTextContainer">
                                {post.postText}
                            </div>
                            <h3>@{post.author.name}</h3>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default Home;