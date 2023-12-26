<?php

    class GetDataModel{
        public static function getData($email){

            $link = Conexion::connect();

            $stmt = $link->prepare("SELECT nombre_usuario, puntaje_usuario, email_usuario FROM datos_usuarios WHERE email_usuario = :a");
            $stmt -> bindParam(":a", $email, PDO::PARAM_STR);
            $stmt -> execute();

            $result = $stmt -> fetchAll();
            return $result;
        }
    }