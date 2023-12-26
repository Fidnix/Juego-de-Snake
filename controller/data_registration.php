<?php

    // $strVerification1 = preg_replace('/[a-zA-Zá-úÁ-Ú\s]/', "", $_POST["nombre"]);

    if(
        !preg_match('/[a-zA-Zá-úÁ-Ú\s]/', $_POST["nombre"]) ||
        !preg_match('/^\w.*@(gmail)?(outlook)?(hotmail)?(\.com)$/', $_POST["email"]) ||
        $_POST["pass"] !== $_POST["confirm_pass"]
    ){
        header("location:../index.php?err=invalid_data&pag=registro");
        return;
    }

    require "../model/insert_data.php";
    if (!insertDataClassModel::insertData( $_POST["nombre"], $_POST["email"], $_POST["pass"] ) ){
        header("location:../index.php?err=user_exist");
        return;
    }
    // 201
    header("location:../index.php?pag=register_succesful");