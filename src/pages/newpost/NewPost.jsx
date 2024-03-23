import React, {useState} from "react";
import './NewPost.css'
import {useForm} from "react-hook-form"
import {useNavigate} from "react-router-dom";
import calculateReadTime from "../../helpers/calculateReadTime.js";

function NewPost() {

    const {register, handleSubmit, formState: {errors}} = useForm();

   const navigate= useNavigate();

    function handleFormSubmit(data){

        if(Object.keys(errors).length=== 0) {
        console.log( {
            title: data.title,
            subtitle: data.subtitle,
            name: data.name,
            blogpost: data.blogpost,
            shares: 0,
            comments: 0,
            created: new Date().toISOString(),
            readTime: calculateReadTime(data.blogpost)
        });
            console.log ("De blog is succesvol verzameld! 🌈");
            navigate('/posts');
        } else {

        }

    }



    return (
        <section className="add-post-section outer-content-container">
            <div className="inner-content-container__text-restriction">
                <form className="new-post-form" onSubmit={handleSubmit(handleFormSubmit)}>
                    <h1> Post toevoegen </h1>
                    <label htmlFor="title-field">
                        Titel
                     <input
                     type="text"
                     id="title-field"
                     { ...register("title", {
                         required: {
                             value: true,
                             message: 'Dit veld is verplicht',
                         }})}
                         />
                        {errors.title && <p>{errors.title.message}</p>}
                    </label>
                    <label htmlFor="subtitle-field">
                        Subtitel
                    <input
                        type="text"
                        id="subtitle-field"
                        {...register("subtitle", {
                            required: {
                                value: true,
                                message: 'Dit veld is verplicht',
                            }
                        })}
                        />
                        {errors.subtitle && <p>{errors.subtitle.message}</p>}
                    </label>
                    <label htmlFor="name-field">
                        Naam en achternaam
                    <input
                        type="text"
                        id="name-field"
                        {...register("name", {
                            required: {
                                value: true,
                                message: 'Dit veld is verplicht',
                            }})}
                        />
                        {errors.name && <p>{errors.name.message}</p>}
                    </label>
                    <label htmlFor="blogpost-field">
                        Blogpost
                    <textarea
                        id="blogpost-field"
                        rows="25"
                        cols="50"
                        {...register("blogpost",{
                            required: {
                                value: true,
                                message: "Dit veld is verplicht",
                            },
                                minLength: {
                                    value: 300,
                                    message: "Input moet minimaal 300 karakters bevatten",
                                },
                                maxLength: {
                                    value: 2000,
                                    message: "Input mag maximaal 2000 karakters bevatten",
                                }
                            })}
                        ></textarea>
                        {errors.blogpost && <p>{errors.blogpost.message}</p>}
                    </label>
                    <button type="submit">
                    Toevoegen
                    </button>
                </form>
            </div>
        </section>
    )
}

export default NewPost;
