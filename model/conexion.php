<?php

    class Conexion{
        public static function connect(){
            $link = new PDO("mysql:host=localhost;dbname=datos_usuarios_snake", "root", "");
            return $link;
        }
    }