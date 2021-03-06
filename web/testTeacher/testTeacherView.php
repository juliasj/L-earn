<?php
//creamos clase de view
	class testTeacherView{


	//Constructor (crea la clase)
	public function __construct(){}

	//Destructor (Destruye la clase)
	public function __destruct(){}

	//creación de método que te devuelve el HTML
	public function welcomeTestView() {
		//variable con el HTML –¡! con comillas simples–y habría que devolver esa variable
		$resultHTML = "
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset='utf-8'>
		<title>Crea tu test | L-Earn</title>
		<link rel='stylesheet' type='text/css' href='style/styleTestTeacher.css'>
        <script type='text/javascript' src='js/jquery-3.2.1.min.js'></script>
        <script type='text/javascript' src='js/main.js'></script>


      </head>
      <body>

        <div id='paso1' class='on'>
          <p class='titleBoxLogin'>BIENVENIDO AL TEST DE L-EARN</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <a href='#' class='buttonLogin' id='btn-preview'>Volver atrás</a>
          <a href='#' class='buttonLogin' id='btn-next' class='welcome-test'>Siguiente</a>
        </div>

      </body>
    </html>


		";
		return $resultHTML;
	}


	//creación de método que te devuelve el HTML
	public function testPasoUnoView($asign) {

		$resultHTML = "
			<div id='paso2'>
			<p class='title_section titleBoxLogin'>Elige una asignatura</p>
			<div class ='asignaturas boxWrap'>";
			foreach ($asign as $row) {
				 $resultHTML.= "<div data-id='{$row['ID_ASIGN']}' data-nivel='{$row['NIVEL_CURSO']}' class='asign subBoxCurso'><p class='asignBig'> {$row['NIVEL_CURSO']}º</p>{$row['NOMBRE_ASIGN']}</div>";
			}
			$resultHTML .= "</div>";
			$resultHTML .= "</div>";
			return $resultHTML;
	}


	//creación de método que te devuelve el HTML
	public function testPasoDosView($temas) {
		$resultHTML = "
			<div id='paso3'>
			<p class='title_section titleBoxLogin'>Elige un tema de tu asignatura</p>
			<select class ='asignaturas'>";
			foreach ($temas as $row) {
				 $resultHTML.= "<option data-id='{$row['ID_TEMAS']}' class='asign' data-trimestre='{$row['TRIMESTRE_TEMAS']}'>{$row['NOMBRE_TEMAS']}</option>";
			}
		$resultHTML .= "</select>";
		$resultHTML .= "</div>";
		return $resultHTML;
	}


	//creación de método que te devuelve el HTML
	public function testPasoTresView() {
		$resultHTML = "
			<div id='paso4'>
					<form class='type-text formLogin'>
							<div class='tipoTestTeacher'>
								<span class='subBoxCurso'>
									Entrenamiento<input type='radio' name='type-test' class='item-test' value='Entrenamiento'>
								</span>
								<span class='subBoxCurso'>
									Final<input type='radio' name='type-test' class='item-test' value='Final'>
								</span>
							</div>					


							Ponle un título a tu test:
							<input type='text' name='nameTest'>
							Pon una descripcion a tu test:
							<input type='text' name='descripcionTest'>
							<input type='submit' value='Siguiente'>
		";
		return $resultHTML;

	}

	//creación de método que te devuelve el HTML
	public function testPasoCuatroView($vista, $tipoTest) {
		$resultHTML = "
			<div id='paso5' data-idtest='{$vista[0]['ID_TEST']}' data-tipo='{$tipoTest}'>
					GENIAL! Estas a punto de crear un nuevo test.
					<div class='btn-start-test'>Empezar</div>
			</div>
		";
		return $resultHTML;
	}

	//creación de método que te devuelve el HTML
	public function testPasoCincoView($idTest, $tipoTest) {
		$resultHTML = "
			<div id='paso6'>

				<div class='preguntaTest on' data-test='1'>
					Enunciado de la pregunta:<br>
					<input type='text' data-test='enunciado' data-id='{$idTest}' data-tipo='{$tipoTest}' name='enunciado'>

					<br>
					<br>
					<div class='item-respuesta' data-respuesta='1'>
						<input type='text' name='enunciado'>
						<select class='pesoRespuesta'>
							<option data-peso='1'>1</option>
							<option data-peso='2'>2</option>
							<option data-peso='3'>3</option>
							<option data-peso='4'>4</option>
						</select>
						<input type='radio' name='true' value='1'>Respuesta correcta<br>
					</div>

					<div class='item-respuesta' data-respuesta='2'>
						<input type='text' name='enunciado'>
						<select class='pesoRespuesta'>
							<option data-peso='1'>1</option>
							<option data-peso='2'>2</option>
							<option data-peso='3'>3</option>
							<option data-peso='4'>4</option>
						</select>
						<input type='radio' name='true' value='1'>Respuesta correcta<br>
					</div>

					<div class='item-respuesta' data-respuesta='3'>
						<input type='text' name='enunciado'>
						<select class='pesoRespuesta'>
							<option data-peso='1'>1</option>
							<option data-peso='2'>2</option>
							<option data-peso='3'>3</option>
							<option data-peso='4'>4</option>
						</select>
						<input type='radio' name='true' value='1'>Respuesta correcta<br>
					</div>


					<div class='item-respuesta' data-respuesta='4'>
						<input type='text' name='enunciado'>
						<select class='pesoRespuesta'>
							<option data-peso='1'>1</option>
							<option data-peso='2'>2</option>
							<option data-peso='3'>3</option>
							<option data-peso='4'>4</option>
						</select>
						<input type='radio' name='true' value='1'>Respuesta correcta<br>
					</div>


					<div class='btn-next-pregunta' data-test='1'>Siguiente</div>

				</div>

			</div>
		";
		return $resultHTML;
	}





	}

?>
