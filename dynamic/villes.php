<?php 
include('config.php');

if ($_GET['cp']){
    
    $req = $bdd->prepare('SELECT `ville`, `cp` FROM `villes` WHERE `cp` LIKE :cp"%"');
    $req->bindValue(':cp', $_GET['cp']);
    $req->execute();
    $villes = $req->fetchAll(PDO::FETCH_ASSOC);
    // p($villes); 
    $tabVilles = array();
    foreach ($villes as $ville) {
        array_push($tabVilles, array(
            "ville" => $ville['ville'],
            "cp" => $ville['cp'] ));
    }

    header('Content-Type: application/json');
    echo json_encode($tabVilles);
} else {
    echo('ya rien casse toi');
    p($bdd);
}
$req->closeCursor();
?>