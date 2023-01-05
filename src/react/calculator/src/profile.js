<html lang="en">

    <head>
        <meta charset="utf-8">
            <title>Signin Template · Bootstrap v5.3</title>

            <link href="https://getbootstrap.com/docs/5.3/dist/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">


                <style>
        /*  html,
                    body {
                        height: 100%;
        } */

        /* body {
                        display: flex;
                    align-items: center;
                    padding-top: 40px;
                    padding-bottom: 40px;
                    background-color: #f5f5f5;
        } */
                    #Cardcontainer { }

                    .card {
                        margin - top: 20px;
        }

                    #post {
                        position: absolute;
                    bottom: 50;
                    right: 50;
        }
                    h3{
                        padding: 10px;
        }
                </style>
            </head>

            <body>





                <!--  <nav class="navbar bg-body-tertiary">
                    <div class="container-fluid">
                        <a class="navbar-brand">Navbar</a>
                        <form class="d-flex" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                                <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>

                </nav>  -->
                <div class="container">
                    <nav class="navbar bg-body-tertiary">
                        <div class="container-fluid">
                            <a class="navbar-brand" href="test.html">Feed</a>
                            <form class="d-flex" role="search">
                                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                                    <button class="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>
                    </nav>
                    <div class="card" style="">
                        <img src="..." class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">Username</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">An item</li>
                                <li class="list-group-item">A second item</li>
                                <li class="list-group-item">A third item</li>
                            </ul>
                            <div class="card-body">
                                <a href="#" class="card-link">Card link</a>
                                <a href="#" class="card-link">Another link</a>
                            </div>
                    </div>

                    <h3 class="text-start">Posts:</h3>

                    <div id='Cardcontainer' class="container">
                        <div class="card" style="">
                            <img class="card-img-top" src="..." alt="Card image cap">
                                <div class="card-body">
                                    <h5 class="card-title">Card title</h5>
                                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                                        card's content.</p>
                                    <a href="#" class="btn btn-light">👍</a>
                                </div>
                        </div>

                        <div class="card" style="">
                            <img class="card-img-top" src="..." alt="Card image cap">
                                <div class="card-body">
                                    <h5 class="card-title">Card title</h5>
                                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                                        card's content.</p>
                                    <a href="#" class="btn btn-light">👍</a>
                                </div>
                        </div>


                    </div>
                    <button id="post" type="button" class="btn btn-primary btn-lg"
                        onclick="location.href='https://5500-simonklausludwig-base-qamkaqmyjiu.ws-eu80.gitpod.io/src/bootstrap/post.html'">Posten</button>





                </div>
                <!--
                <nav class="navbar navbar-light bg-light justify-content-between">
                    <a class="navbar-brand">Navbar</a>
                    <form class="form-inline">
                        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </nav> -->






            </body>

        </html>