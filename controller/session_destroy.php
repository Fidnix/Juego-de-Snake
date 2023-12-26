<?php
    session_start();
    session_destroy();
    echo "Chucha";
    header("location:../index_nsscj.php");