<link rel="stylesheet" href="views/css/game4.css">

<main>
    <section class="data-game">
        <div class="data-game--user-data">
            <h2>Nombre del Jugador:</h2>
            <?php 
                //Sesion iniciada
                echo $_SESSION["data"]["nombre_usuario"];
            ?>
        </div>

        <div class="data-game--user-data">
            <h2>Máximo puntaje del Jugador:</h2>
            <p id="max-score-p">
                <?php
                    require "controller/puntaje2.php";
                ?>
            </p>
        </div>

        <div class="data-game--user-data">
            <h2>Puntaje actual del juego:</h2>
            <p id="score-p">
                0
            </p>
        </div>

        <div class="data-game--user-data">
            <h2>Dirección del snake:</h2>
            <!-- direccion_snake_parrafo -->
            <div id="user-data--direction-display">
                <div class="central-circle"></div>
                <div class="arrow arrow-up"></div>
                <div class="arrow arrow-right arrow-selected"></div>
                <div class="arrow arrow-left"></div>
                <div class="arrow arrow-down"></div>
            </div>
        </div>

        <div class="btn-cont">
            <button class="btn-cont--game-btn" id="play_btn" onmousedown = "play()">Play</button>
            <button class="btn-cont--game-btn" id="stop_btn" disabled="true" onmousedown = "stop()">Stop</button>
        </div>
    </section>

    <section class="space-game">
        <canvas id="game"></canvas>
        <div class = "popup-game-over disabled">
            <div class = "game-over-info">
                <h2>Game over</h2>
                
            </div>
        </div>
    </section>
</main>
<script src="views/js/game_code10.js"></script>
<script src="views/js/game_btns_code3.js"></script>