<?php

    class VerifyDataClassModel{
        // Verifica si existen los emails, y password enviados
        // Si no existen en la base de datos, devuelve false
        public static function verifyDataFuncModel($email, $password){
            require "conexion.php";

            $link = Conexion::connect();

            // Obtencion de email y contraseña
            $stmt = $link -> prepare("SELECT email_usuario, password_usuario FROM datos_usuarios WHERE email_usuario = :a and password_usuario = :b");

            $stmt->bindParam(":a", $email, PDO::PARAM_STR);
            $stmt->bindParam(":b", $password, PDO::PARAM_STR);
            $stmt -> execute();
            $result = $stmt->fetchAll();

            // Cierre de acccesos
            $link = null;
            $stmt = null;

            // Manejo de excepciones
            if( count($result) != 0 ){
                return true;
            }else{
                return false;
            }

        }
    }