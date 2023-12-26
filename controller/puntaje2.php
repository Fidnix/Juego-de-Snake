<?php
    require "model/conexion.php";
    $link = Conexion::connect();

    $stmt = $link -> prepare("SELECT puntaje_usuario FROM datos_usuarios WHERE email_usuario = :a");

    $stmt->bindParam(":a", $_SESSION["data"]["email_usuario"], PDO::PARAM_STR);

    $stmt->execute();

    $result = $stmt->fetch();
    echo $result[0];