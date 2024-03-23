import React, {useState} from "react";
import './NewPost.css'
import {useForm} from "react-hook-form"
import {Link, useNavigate} from "react-router-dom";
import calculateReadTime from "../../helpers/calculateReadTime.js";
import axios from "axios";
import Button from "../../components/button/Button.jsx";

function NewPost() {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const [submitSuccessId, setSubmitSuccessId] = useState(null);

   const onSubmit = async (data) => {
       try {
           const response= await axios.post('http://localhost:3000/posts', {
               title: data.title,
               subtitle: data.subtitle,
               name: data.name,
               content: data.content,
               shares: 0,
               comments: 0,
               created: new Date().toISOString(),
               readTime: calculateReadTime(data.content)
           });
           console.log ("De post is succesvol toegevoegd: je kunt deze hier  bekijken");
           setSubmitSuccessId(response.data.id);
       } catch (error) {
           console.error("Error posting data:", error);
            }
   }

    return (
        <section className="add-post-section outer-content-container">
            <div className="inner-content-container__text-restriction">
                <form className="new-post-form" onSubmit={handleSubmit(onSubmit)}>
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
                    <label htmlFor="post-content">
                        Blogpost </label>
                    <textarea
                        id="post-content"
                        rows="25"
                        cols="50"
                        {...register("content",{
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
                    <Button type="submit" variant = "primary">
                        Toevoegen
                    </Button>
                    {errors.content && <p>{errors.content.message}</p>}
                </form>
                {submitSuccessId && ( <p> De blogpost is succesvol toegevoegd. Je kunt deze <Link to={`/posts/${submitSuccessId}`}> hier</Link> bekijken. </p>
                )}
            </div>
        </section>
    )
}

export default NewPost;
