<?php
    session_start();
    echo var_dump($_SESSION["data"]);
?>

<form action="../controller/update_score_controller.php" method="post">
    <input type="number" name="newpuntuacion" id="cuack">
    <input type="submit" value="">
</form>