import 'bootstrap/dist/css/bootstrap.min.css';
import './css/post.css';
import React, { isValidElement } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import { useForm } from "react-hook-form";
import {
  Link
} from "react-router-dom";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';


function Post() {


  function birdPost(data) {
    debugger;
    fetch("http://localhost:8080/api/birdpost?user="+"test"+"&content=" + data.post+"&uuid="+uuidv4(),
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
  return (
    <main id='PostMain'>
      

      <form onSubmit={handleSubmit(onSubmit)}>

        <Link to={'/'+username}>
          <button id='ZurueckBtn' type="button" class="btn btn-primary">
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        </Link>

        <div class="form-floating">
          <textarea
            {...register("post", { required: true })}
            class="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea2"
            style={{ height: '300px' }}
          ></textarea>
          <label for="floatingTextarea2">Poste etwas</label>
        </div>
        <Link to={'/post'+username}>
        <button id='PostBtn' class="btn btn-primary" type="submit">Posten</button>
        </Link>
      </form>
    </main >
  );
}

export default Post;


