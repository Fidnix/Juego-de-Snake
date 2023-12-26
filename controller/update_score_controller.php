<?php

    session_start();

    class UpdateScoreController{
        public static function updateScore($email, $score){
            require "../model/update_score_model.php";
            UpdateScoreModel::updateScore($email, $score);
        }
    }
    UpdateScoreController::updateScore(
        $_SESSION["data"]["email_usuario"],
        intval($_POST["newpuntuacion"])
    );

    session_abort();
    echo "Succes";