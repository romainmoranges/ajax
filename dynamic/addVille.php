<?php
include('config.php');

$add = $bdd->prepare('INSERT INTO `villes` (`ville`, `cp`) VALUES (:ville, :cp)');
$add->bindValue(':ville', $_GET['ville']);
$add->bindValue(':cp', $_GET['cp']);
$add->execute();

$add->closeCursor();