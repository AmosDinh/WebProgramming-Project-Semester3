import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { isValidElement } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import { useForm } from "react-hook-form";

function Post() {


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

  return (
    <main>

      <form onSubmit={handleSubmit(onSubmit)}>

        <a href='/'>
          <button id='ZurueckBtn' type="button" class="btn btn-primary">
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        </a>

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

        <button id='PostBtn' class="btn btn-primary" type="submit">Posten</button>

      </form>
    </main >
  );
}

export default Post;


