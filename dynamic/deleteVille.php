<?php 
include('config.php');
$del = $bdd->prepare('DELETE FROM `villes` WHERE `ville` = :ville');
$del->bindValue(':ville', $_GET['ville']);
$del->execute();

$del->closeCursor();