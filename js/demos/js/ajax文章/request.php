<?php
    header("Content-type: text/html; charset=utf-8"); 
    $page = $_GET['page'];
    $db = include 'db.php';
    
    $num = 10;
    $start = ($page-1)*$num;
    $end = $start + $num;
    $result = array();
    for ($i=$start; $i < $end; $i++) { 
        $result[] = $db[$i];
    }
    
 echo   json_encode($result);
    
    
?>