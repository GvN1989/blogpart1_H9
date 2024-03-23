import React, {useState} from "react";
import posts from "../../constants/data.json";
import './Overviewpost.css'
import axios from "axios";
import Button from "../../components/button/Button.jsx";
import PostItem from "../../components/postItem/PostItem.jsx";
import ErrorMessage from "../../components/errorMessage/ErrorMessage.jsx";

function OverviewPost(){
    const [post, setPost] = useState ([]);
    const [error, toggleError] = useState(false);

    async function fetchPosts() {
        toggleError(false);

        try{
            const response= await axios.get('http://localhost:3000/posts');
            console.log(response.data);
            setPost(response.data);
        } catch (e) {
            console.error(e)
            toggleError(true)
        }
    }

    return (

        <section className="overview-section outer-content-container">
            <div className="inner-content-container">
                <Button type="button" onClick={fetchPosts} > Haal alle posts op</Button>
                {posts.length>0 && (
                    <>
                       <h1>Bekijk alle {post.length} posts op het platform </h1>
                        <ul className="post-list">
                            {post.map((post)=> (
                                <PostItem
                                    key={post.id}
                                    id={post.id}
                                    title={post.title}
                                    shares={post.shares}
                                    comments={post.comments}
                                    author={post.author}
                                />
                            ))}
                        </ul>
                    </>
                )}
                {error && <ErrorMessage message="Er is iets misgegaan bij het ophalen van de data. Probeer het opnieuw"/>}
            </div>
        </section>
    );
}

export default OverviewPost;