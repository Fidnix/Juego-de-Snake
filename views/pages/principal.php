<link rel="stylesheet" href="views/css/main2.css">
<main>
    <section class= "rank-option-cont">
        <article class = "rank-option-cont--article__play">
            <h2>Jugar a snake 2d</h2>
        
            <p>
                ¡Juega a Snake 2D y compite por llegar al puesto más alto!
            </p>
        
            <a class = "article__play--play-btn" href = "index.php?pag=jugar"><span>Play</span></a>
            
        </article>
        <article class = "rank-option-cont--article__rank">
            <h2>Ranking</h2>
    
            <p>
                Aquí verá a los 10 mejores jugadores, probablemente seas uno de ellos o incluso puedas llegar a ser uno
            </p>
    
            <br>
            <div style="height:250px; border: 1px solid gray;" id="lienzo_container">
                <canvas id="lienzo"></canvas>
            </div>
        </article>
    </section>
    <section class = "video-cont">
        <video src=""></video>
    </section>
</main>
<script src="views/js/chart.js"></script>
<script src= "views/js/ranking.js"></script>