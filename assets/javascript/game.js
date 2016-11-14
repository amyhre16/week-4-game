$(document).ready(function() {
	// var sound;

	// user clicks on a character to choose attacker
	$('#characterPool').children().on('click', function() {
		$('#messages').empty();
		if ($('#attackerPool').children().length == 0) {
			$(this).appendTo('#attackerPool');
			$('#characterPool').children().appendTo('#availableEnemies');
		}

		// // else if ($('#enemyPool').children().length == 0) {
		// // 	$(this).appendTo('#enemyPool');
		// // }
	});

	$('div').on('click', '.character', function() {
		if ($(this).attr('id') == 'character1') {
			var sound = new Audio('assets/sounds/arthur.m4a');
			sound.play();
		}

		else if ($(this).attr('id') == 'character2') {
			 var sound = new Audio('assets/sounds/black_knight.m4a');
			sound.play();	
		}

		else if ($(this).attr('id') == 'character3') {
			var sound = new Audio('assets/sounds/knights_who_say_ni.m4a');
			sound.play();
		}

		else if ($(this).attr('id') == 'character4') {
			var sound = new Audio('assets/sounds/the_rabbit.m4a');
			sound.play();
		}
	});

	$('#availableEnemies').on('click', '.character', function() {
		$('#messages').empty();
		if ($('#enemyPool').children().length == 0) {
			$(this).appendTo('#enemyPool');
		}
	});

	$('#attackBtn').on('click', function() {
		$('#messages').empty();
		var attacker = $('#attackerPool').children();
		var enemy = $('#enemyPool').children();

		if ((attacker.length != 0) && (enemy.length != 0) /*&& ($('#availableEnemies').children().length != 0)*/) {

			attack(attacker, enemy);

			// attack killed the enemy
			if (enemy.children().text() <= 0) {
				// still characters left to attack
				if ($('#availableEnemies').children().length != 0) {
					enemy.children().text(0);
					enemy.appendTo($('#deadPool'));	
				}
				// defeated the last enemy and won the game!
				else {
					enemy.appendTo($('#deadPool'));
					displayMessage("You won!");
					$(this).prop('disabled', true);
					$('#reset').prop('disabled', false);
					$('#reset').show();
				}
			}

			// enemy is still standing and is able to counter
			else {
				counter(attacker, enemy);

				if (/*parseInt(*/attacker.children().text() <= 0) {
					attacker.children().text("0");
					displayMessage("Run away! Run away!<br>You have been defeated!");
					$(this).prop('disabled', true);
					$('#reset').show();
					// reset();
				}
			}
		}

		else if (attacker.length == 0) {
			displayMessage("You have not selected an attacker. Please select an attacker then try again.");
		}

		else if (attacker.length != 0 && enemy.length == 0) {
			displayMessage("You have not selected an enemy. Please select and enemy then chunk the Holy Hand Grenade at him!");
		}

	});

	$('#reset').on('click', function() {
		$('#messages').empty();
		reset();
	});

	function attack(attacker, enemy) {
		$('#messages').empty();
		// var enemyDamage = enemy.attr('hp') - attacker.attr('data-attack');
		var enemyHP = enemy.children().next().text() - attacker.attr('data-attack');
		enemy.children().next().html(enemyHP);

		$('#messages').append("<p>" + attacker.attr('data-name') + " attacked " + enemy.attr('data-name') + " for " + attacker.attr('data-attack') +" damage</p>");
		// console.log("New enemy hp: " + enemyDamage);
		var attackerPower = parseInt(attacker.attr('data-attack')) + parseInt(attacker.attr('data-baseAttack'));
		attacker.attr('data-attack', attackerPower);

		/*var attackerDamage = attacker.children().text() - enemy.attr('data-counter');
		attacker.children().html(attackerDamage);
		// attacker.attr('hp', attackerDamage);*/
	}

	function counter(attacker, enemy) {
		var attackerHP = attacker.children().next().text() - enemy.attr('data-counter');
		attacker.children().next().html(attackerHP);
		// console.log("New attacker hp: " + attackerDamage);

		$('#messages').append("<p>" + enemy.attr('data-name') + " countered for " + enemy.attr('data-counter') + " damage</p>");;
		// $('#messages').text()
	}

	function displayMessage(message) {
		$('#messages').html(message);
	}

	function reset() {
		// move all characters back to the character pool
		$('#character1').appendTo($('#characterPool'));
		$('#character2').appendTo($('#characterPool'));
		$('#character3').appendTo($('#characterPool'));
		$('#character4').appendTo($('#characterPool'));
		// fill arrays with the base (starting) values for the hp and attack
		var baseHP = [$('#character1').attr('data-baseHP'), $('#character2').attr('data-baseHP'), $('#character3').attr('data-baseHP'), $('#character4').attr('data-baseHP')];
		var baseAttack = [$('#character1').attr('data-baseAttack'), $('#character2').attr('data-baseAttack'), $('#character3').attr('data-baseAttack'), $('#character4').attr('data-baseAttack')];
		// assign the base hp to the hp attribute to reset it
		$('#character1').children().html(baseHP[0]);
		$('#character2').children().html(baseHP[1]);
		$('#character3').children().html(baseHP[2]);
		$('#character4').children().html(baseHP[3]);
		/*$('#character1').attr('hp', baseHP[0]);
		$('#character2').attr('hp', baseHP[1]);
		$('#character3').attr('hp', baseHP[2]);
		$('#character4').attr('hp', baseHP[3]);*/
		// assign the base attack to the attack attribute to reset it
		$('#character1').attr('data-attack', baseAttack[0]);
		$('#character2').attr('data-attack', baseAttack[1]);
		$('#character3').attr('data-attack', baseAttack[2]);
		$('#character4').attr('data-attack', baseAttack[3]);

		$('#messages').empty();

		$('#attackBtn').prop('disabled', false);
		$('#reset').prop('disabled', true);
		$('#reset').hide();
	}
});