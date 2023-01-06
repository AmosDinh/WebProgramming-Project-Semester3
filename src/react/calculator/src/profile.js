import 'bootstrap/dist/css/bootstrap.min.css';
import './css/profile.css';
import React, { isValidElement } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Link
  } from "react-router-dom";
import useFetch from "react-fetch-hook";

function Profile() {


    function birdPost(data) {
      
        fetch("https://8080-simonklausludwig-base-ycdw0o9z9yb.ws-eu81.gitpod.io/api/birdpost?content=" + data.post,
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
    let { username, profileusername } = useParams();

    const { isLoading, data, error } = useFetch("https://8080-fastiki-webprogramierun-9rrzlddhh7d.ws-eu81.gitpod.io/api/getUserPosts/"+profileusername);

    if (isLoading) {
      return <div>Is loading!</div>
    }
    debugger
    return (
        <div class="container">
            <nav class="navbar bg-body-tertiary">
                <div class="container-fluid">
                    <Link class="navbar-brand" to={"/"+username}>Feed</Link>
                    <Link class="navbar-brand" to={"/profile/"+username+"/"+username}>{username==profileusername?<b>Profile</b>:Profile}</Link>
                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </nav>
            <div class="card">
             {/*    <img src="..." class="card-img-top" alt="..." /> */}
                <div class="card-body">
                    <h5 class="card-title">@{profileusername}</h5>
                    <p class="card-text"></p>
                </div>
                <ul class="list-group list-group-flush">
                  {/*   <li class="list-group-item">Total Posts: {data.length}</li> */}
                  {/*   <li class="list-group-item">A second item</li>
                    <li class="list-group-item">A third item</li> */}
                </ul>
              {/*   <div class="card-body">
                    <Link to="#" class="card-link">Card link</Link>
                    <Link to="#" class="card-link">Another link</Link>
                </div> */}
            </div>

            <h3 class="text-start">{data.length} Post{ data.length==1? "":'s' }:</h3>

            <div id='Cardcontainer' class="container">
            {
                data.map((post) => <div class="card"><div class="card-body">
                
                    <h6 class="card-title"> {post.datetime}</h6>
                    
                    <p class="card-text">{post.content}</p></div></div>)
            }


            </div>
          {/*   <Link to="/post">
            <button id="post" type="button" class="btn btn-primary btn-lg">Posten</button>
            </Link> */}
        </div>
    );
}

export default Profile;