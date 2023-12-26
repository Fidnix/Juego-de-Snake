<?php

    class insertDataClassModel{
        public static function insertData( $name, $email, $pass ){
            include "conexion.php";

            $queryInsert = "INSERT INTO datos_usuarios (nombre_usuario, email_usuario, password_usuario)  VALUES (:a, :b, :c)";
            $querySelect = "SELECT email_usuario FROM datos_usuarios WHERE :b != email_usuario";

            $link = Conexion::connect();
            $stmt = $link -> prepare( $querySelect );

            $stmt->bindParam(":b", $email, PDO::PARAM_STR);
            $stmt -> execute();

            $result = $stmt -> fetchAll();

            if( count($result) == 0 ){
                $link = null;
                $stmt = null;
                return false;
            }
            $stmt = $link -> prepare( $queryInsert );

            $stmt->bindParam(":a", $name, PDO::PARAM_STR);
            $stmt->bindParam(":b", $email, PDO::PARAM_STR);
            $stmt->bindParam(":c", $pass, PDO::PARAM_STR);

            $stmt -> execute();
            $link = null;
            $stmt = null;
            return true;
        }
    }