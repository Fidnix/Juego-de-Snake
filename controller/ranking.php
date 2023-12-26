<?php

    require "../model/ranking.php";
    $result = GetRanking::getRank();
    echo json_encode(
        [
            [
                "nombre" => $result["0"]["nombre_usuario"],
                "puntaje" => intval($result["0"]["puntaje_usuario"]),
            ],
            [
                "nombre" => $result["1"]["nombre_usuario"],
                "puntaje" => intval($result["1"]["puntaje_usuario"]),
            ],
            [
                "nombre" => $result["2"]["nombre_usuario"],
                "puntaje" => intval($result["2"]["puntaje_usuario"]),
            ]
        ]
    );