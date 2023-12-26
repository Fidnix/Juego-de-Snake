<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet"> -->
    <link rel="stylesheet" href="views/css/global.css">
    <link rel="stylesheet" href="views/css/menu3.css">
    <link rel="stylesheet" href="views/css/style_err.css">
    <link rel="icon" href="views/images/logo_snake_2d_v2.svg" type="image/svg">
</head>

<?php 
    session_start();
    if( !isset($_SESSION["p"])){
        session_destroy();
    }

    // Manejo de errores: en caso que los datos ingresados sean invalidos
    if( isset( $_GET["err"] ) ){
        switch ($_GET["err"]) {
            case 'invalid_data':
                echo "<div id = \"err\"><strong>Error:</strong> datos invalidos</div>";
                break;
            case 'user_not_found':
                echo "<div id = \"err\"><strong>Error:</strong> Usuario no encontrado, datos mal escritos<br/>o tal vez no está registrado</div>";
                break;
            case 'user_exist':
                echo "<div id = \"err\"><strong>Error:</strong>El usuario ya está registrado</div>";
                break;
        }
    }
?>

<body>

    <header>
        <figure>
            <img src="views/images/logo_snake_2d_v2.svg" alt="Logo">
            <span>
                Snake 2D
            </span>
        </figure>

        <nav>
            <!-- Si el usuario inicia sesion aparecera los botones principales -->
            <?php
                if( session_status() == 2 ){
                    include "views/pages/main/header.html";
                }
            ?>
        </nav>
    </header>
    
    <?php
        if( session_status() == 2 ){
            if ( isset($_GET["pag"]) ){
                switch ($_GET["pag"]) {
                    case 'verified':
                        include "views/pages/verificado.php";
                        echo "<title>Inicio de sesion correcto</title>";
                        break;
                    case 'principal':
                        include "views/pages/principal.php";
                        echo "<title>Pagina principal</title>";
                        break;
                    case 'register_succesful':
                        include "views/pages/register/succesful.html";
                        echo "<title>Registro correcto</title>";
                        break;
                        case 'jugar':
                        require "views/pages/juego.php";
                        echo "<title>Juego</title>";
                        break;
                    case 'salir':
                        session_destroy();
                        header("location:index.php");
                        break;
                    default:
                        include "views/pages/not_found_404.html";
                        echo "<title>Error 404</title>";
                        break;
                    }
            }else{
                include "views/pages/principal.php";
                echo "<title>Pagina principal</title>";
            }
        }else if( isset($_GET["pag"]) && $_GET["pag"] == "registro"){
            include "views/pages/register/index.html";
            echo "<title>Registrar</title>";
        }
        else{
            include "views/pages/login/index.html";
            echo "<title>Iniciar sesion</title>";
        }
    ?>
</body>
</html>