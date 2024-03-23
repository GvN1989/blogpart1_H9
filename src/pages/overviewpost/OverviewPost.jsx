import React, {useState} from "react";
import posts from "../../constants/data.json";
import {Link, useParams} from "react-router-dom";
import './Overviewpost.css'
import axios from "axios";

function OverviewPost(){
    const [post, setPost] = useState ([]);
    const [error, toggleError] = useState(false);




    return (
        <section className="overview-section outer-content-container">
            <div className="inner-content-container">
                    <h1> Bekijk alle {posts.length} posts op het platform </h1>
                    <ul className="post-list">
                        {posts.map((post)=> (
                            <li key = {post.id} className="post-item">
                                <h2 className="post-title"> <Link to={`/posts/${post.id}`}>{post.title} </Link> ({post.author})</h2>
                                <p> {post.comments} reacties - {post.shares} keer gedeeld </p>
                            </li>
                        ))}
                    </ul>
            </div>
        </section>
    );
}

export default OverviewPost;