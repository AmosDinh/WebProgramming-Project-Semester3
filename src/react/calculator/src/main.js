import 'bootstrap/dist/css/bootstrap.min.css';
import './css/main.css';
import React, { isValidElement } from 'react'
import useFetch from "react-fetch-hook";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import { useForm } from "react-hook-form";
import {

    Link
  } from "react-router-dom";
import { useParams } from "react-router-dom";

function Main() {

    function birdPost(data) {
        fetch("https://8080-fastiki-webprogramierun-9rrzlddhh7d.ws-eu81.gitpod.io/api/birdpost?content=" + data.post,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
            })
            .then(function (res) { window.location.reload() })
            .catch(function (res) { console.log(res) });

    }

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = birdPost

    
    let { username } = useParams();

    const { isLoading, data, error } = useFetch("https://8080-fastiki-webprogramierun-9rrzlddhh7d.ws-eu81.gitpod.io/api/getUserFeed/"+username);

    if (isLoading) {
      return <div>Is loading!</div>
    }
    return (
        <div class="container">
          
            <nav class="navbar bg-body-tertiary">
                <div class="container-fluid">
                    <Link class="navbar-brand" to={"/"+username}><b>Feed</b></Link>
                    <Link class="navbar-brand" to={"/profile/"+username+"/"+username}>Profile</Link>
                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </nav>
            <div id='Cardcontainer' class="container">
       
                 {
        data.map((post) => <div class="card"><div class="card-body">
            <Link to={"/profile/"+username+"/"+post.username}>
            <h6 class="card-title">@{post.username}</h6>
            </Link>
            <p class="card-text">{post.content}</p></div></div>)
            } 
            <div>
      

    </div>
            </div>
            <Link to={'/post/'+username}>
            <button id="post" type="button" class="btn btn-primary btn-lg"
                >Posten</button>

            </Link>
        </div>
    );
}

export default Main;








