<link rel="stylesheet" href="views/css/login_succesful.css">

<?php
    if( isset($_SESSION["p"]) ):
?>

<div id="usuario_verificado">
    <h2>
        Felicidades, ya está su cuenta iniciada
    </h2>

    <hr>

    <div>
        <h4>
            ¡Disfrute mucho del juego!
        </h4>
    </div>

    <div><a href="index.php?pag=principal">Ir al menú</a></div>
</div>

<?php
    else:
        session_abort();
        header("location:./view/pages/err/err_404.html");
    endif;
?>