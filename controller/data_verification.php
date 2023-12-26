<?php
    // Elimina los caracteres aceptados en la esturtcura sintáctica de un email
    // $strVerificationEmail = preg_replace('/^\w.*@(gmail)?(outlook)?(hotmail)?(\.com)$/', "", $_POST["email"]);

    // Verifica si el email está bien escrito
    if(!preg_match('/^\w.*@(gmail)?(outlook)?(hotmail)?(\.com)$/', $_POST["email"])){
        header("location:../index.php?err=invalid_data");
        return;
    }

    require "../model/verify_data.php";

    // Si existe el ususario, se le da acceso
    if(!VerifyDataClassModel::verifyDataFuncModel($_POST["email"], $_POST["pass"])){
        header("location:../index.php?err=user_not_found");
        return;
    }
    session_start();

    // Se verifica que existe una sesión válida
    $_SESSION["p"] = true;

    require "../model/get_data.php";

    // Se crea en la sesión el apartado de datos que contiene:
    // - nombre
    // - puntaje
    // - email
    $user_data = GetDataModel::getData($_POST["email"]);
    $_SESSION["data"] = [
        "nombre_usuario" => $user_data[0]["nombre_usuario"],
        "puntaje_usuario" => $user_data[0]["puntaje_usuario"],
        "email_usuario" => $user_data[0]["email_usuario"],
    ];

    // echo var_dump($_SESSION["data"]);
    header("location:../index.php?pag=verified");