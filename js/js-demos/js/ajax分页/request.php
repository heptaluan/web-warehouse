<?php
    $db = include 'db.php';
    $page = $_GET['page'];
    $num = 12;
    $start = ($page-1)*$num;
    $end = $start+$num;
    
    $result = array();
    for($i=$start;$i<$end;$i++){
        $result[] = $db[$i];
    }
    
    echo json_encode($result);




?>