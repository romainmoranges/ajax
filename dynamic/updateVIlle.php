<?php

include('config.php');
$update = $bdd->prepare('UPDATE `villes` SET `ville` = :ville WHERE `ville` = :oldValue');
$update->bindValue(':ville', $_GET['ville']);
$update->bindValue(':oldValue', $_GET['oldValue']);
$update->execute();

$update->closeCursor();