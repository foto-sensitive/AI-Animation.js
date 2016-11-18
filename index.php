
<?php

if (($handle = fopen("predictions.csv", "r")) !== FALSE) {
while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
  $num = count($data);

  if(is_numeric($data[1]))
      $arr[] = $data[1];

}
fclose($handle);
}

$size = sizeof($arr);

?>

<!DOCTYPE html>
<html lang="en">
	<head>
    <title>AI Animation</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
		<link rel="stylesheet" type="text/css" href="styles.css">
	</head>
<body>

  <div class = "container" id = "container"></div>

  <div class = "UI" id = "UI">
  <div class="arrow"></div>
  <h1><time id = "time">13:00:00</time></h1>
  <h2>Predictions made now: 17<h2>
  <h3>Predictions made in the past Hour: 17<h3>
   <button type="button" onclick="subtractPredictions();">LESS Predictions</button>
  <button type="button" onclick="predictionsInc= 0;">RESET Predictions</button>
  <button type="button" onclick="incrementPredictions();">MORE Predictions</button>
  </div>

  <script src="goodies/three.js"></script>
  <script src="goodies/js/renderers/Projector.js"></script>
  <script src="goodies/js/renderers/CanvasRenderer.js"></script>

    <script type="text/javascript">
      var predictionsNum = <?php echo $size; ?>;
      var predictionsArr = <?php echo json_encode($arr); ?>;
    </script>

  <script src="Voxel.js"></script>
  <script src="Connection.js"></script>
  <script src="animation.js"></script>
  <script type="clock.js"></script>

</body>
</html>
