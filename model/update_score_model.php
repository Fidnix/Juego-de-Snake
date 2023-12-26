<?php

    class UpdateScoreModel{
        public static function updateScore($email, $score){
            require "conexion.php";
            $link = Conexion::connect();
            $stmt = $link -> prepare("UPDATE datos_usuarios SET puntaje_usuario = :a WHERE email_usuario = :b");
            $stmt->bindParam(":a", $score, PDO::PARAM_INT);
            $stmt->bindParam(":b", $email, PDO::PARAM_STR);
            $stmt->execute();
            
            $link = null;
            $stmt = null;
            // return "xd";
        }
    }