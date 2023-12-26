<?php

    class GetRanking{
        public static function getRank(){
            require "conexion.php";
            $link = Conexion::connect();
            $stmt = $link-> prepare("SELECT nombre_usuario, puntaje_usuario FROM datos_usuarios ORDER BY puntaje_usuario DESC LIMIT 3");
    
            $stmt->execute();
    
            return $stmt->fetchAll();
        }
    }