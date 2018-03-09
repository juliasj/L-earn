<?php
	require __DIR__."/../Commons/Commons.php";

	class DoTestFinStudentView{

		public function __construct(){}
		public function __destruct(){}

		public function genTestFin() {
			$resultHTML = "
				<!DOCTYPE html>
					<html>
					<head>
						<meta charset='utf-8'>
						<title>L-EARN | Test final</title>
						<link rel='stylesheet' type='text/css' href='style/styleStudent.css'>
						<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js'></script>
						<script src='js/functionsDoTestFinStudent.js'></script>
					</head>
					<body>
						" . Commons::headerStudent() . "
						<div class='content'>
							<div id='breadcrumb'></div>
							<div id='test'>
								<div id='steps' class='steps'>
									<span id='step-inicio'>Inicio</span>
									<span id='step-0'>1</span>
									<span id='step-1'>2</span>
									<span id='step-2'>3</span>
									<span id='step-3'>4</span>
									<span id='step-4'>5</span>
									<span id='step-5'>6</span>
									<span id='step-6'>7</span>
									<span id='step-7'>8</span>
									<span id='step-8'>9</span>
									<span id='step-9'>10</span>
									<span id='step-final'>Final</span>
								</div>
								<div id='test-do' class='test-do'></div>
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
