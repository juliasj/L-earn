<?php
	// Clase de la Vista
	require __DIR__."/../Commons/Commons.php";

	class AsignStudentView{

		//Constructor (crea la clase)
		public function __construct(){}

		//Destructor (destruye la clase)
		public function __destruct(){}


		// Método que devolverá el HTML
		public function genAsignStudent() {
			// Variable con el HTML –con comillas simples–
			$resultHTML = "
				<!DOCTYPE html>
					<html>
					<head>
						<meta charset='utf-8'>
						<title>L-EARN | Asignaturas del alumno</title>
						<link rel='stylesheet' type='text/css' href='style/styleStudent.css'>
						<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js'></script>
						<script src='js/functionsAsignStudent.js'></script>
					</head>
					<body>
						" . Commons::headerStudent() . "
						<div class='content'>
							<div class='l col9'>
								<div>
									<h2>Mis asignaturas</h2>
									<div id='testAsign'>

									</div>
								</div>
							</div>
						</div>
						" . Commons::footer() . "
					</body>
					</html>
			";
			return $resultHTML;
		}

	}

?>
