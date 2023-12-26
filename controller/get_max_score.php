<?php
    require "../model/get_max_score_model.php";
    $maxScore = GetMaxScoreModel::getMaxScore();
    echo ($maxScore[0]["puntaje_usuario"]);