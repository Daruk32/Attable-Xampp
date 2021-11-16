<?php
$variable = $_POST['postbbd'];
file_put_contents('BddProducts.json', $variable);
?>