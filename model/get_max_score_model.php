<?php
    class GetMaxScoreModel{
        public static function getMaxScore(){
            require_once "../model/conexion.php";
            session_start();
            $link = Conexion::connect();
            // $text = "fidel.moises0@gmail.com";
            $stmt = $link->prepare("SELECT puntaje_usuario FROM datos_usuarios WHERE email_usuario = :a");
            $stmt -> bindParam(":a", $_SESSION["data"]["email_usuario"], PDO::PARAM_STR);
            $stmt -> execute();

            session_abort();
            $result = $stmt -> fetchAll();
            return $result;
        }
    }

    GetMaxScoreModel::getMaxScore();