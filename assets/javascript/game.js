$(document).ready(function() {
	// user clicks on a character to choose attacker
	$('.character').on('click', function() {
		// console.log($(this).parent().attr('id'));
		// console.log($(this).attr('hp'));
		// console.log($(this).attr('attack'));
		// console.log($(this).attr('counter'));
		if ($('#attackerPool').children().length == 0) {
			// $('#attackerPool').append($(this));
			$(this).appendTo('#attackerPool');
		}

		else if ($('#enemyPool').children().length == 0) {
			$(this).appendTo('#enemyPool');
		}
	});

	$('#attackBtn').on('click', function() {
		var attacker = $('#attackerPool').children();
		var enemy = $('#enemyPool').children();
		if ((attacker.length != 0) && (enemy.length != 0)) {
			// attack($('#attackerPool').children(), $('#enemyPool').children());
			/*attack(attacker, enemy);
			// if (parseInt(enemy.attr('hp')) <= 0) {
			if (enemy.children().text() <= 0 && ) {
				// still characters left to attack
				if ($('#characterPool').children().length != 0) {
					enemy.children().text(0);
					enemy.appendTo($('#deadPool'));	
				}
				// defeated the last enemy and won the game!
				else {
					alert("You won!!!! :D");
					reset();
				}
			}

			// if (parseInt(attacker.attr('hp')) <= 0) {
			else if (attacker.children().text() <= 0) {
				// create reset function that moves all characters back to #characterPool and resets all attributes
				alert("you lose");
				reset();
			}*/

			attack(attacker, enemy);

			// attack killed the enemy
			if (enemy.children().text() <= 0) {
				// still characters left to attack
				if ($('#characterPool').children().length != 0) {
					enemy.children().text(0);
					enemy.appendTo($('#deadPool'));	
				}
				// defeated the last enemy and won the game!
				else {
					alert("You won!!!! :D");
					reset();
				}
			}

			// enemy is still standing and is able to counter
			else {
				counter(attacker, enemy);

				if (/*parseInt(*/attacker.children().text() <= 0) {
					alert("You lose! D:");
					reset();
				}
			}
		}
	});

	function attack(attacker, enemy) {
		// var enemyDamage = enemy.attr('hp') - attacker.attr('attack');
		var enemyDamage = enemy.children().text() - attacker.attr('attack');
		enemy.children().html(enemyDamage);
		console.log("New enemy hp: " + enemyDamage);
		var attackerPower = parseInt(attacker.attr('attack')) + parseInt(attacker.attr('baseAttack'));
		attacker.attr('attack', attackerPower);

		/*var attackerDamage = attacker.children().text() - enemy.attr('counter');
		attacker.children().html(attackerDamage);
		// attacker.attr('hp', attackerDamage);*/
	}

	function counter(attacker, enemy) {
		var attackerDamage = attacker.children().text() - enemy.attr('counter');
		attacker.children().html(attackerDamage);
		console.log("New attacker hp: " + attackerDamage);
	}

	function reset() {
		// move all characters back to the character pool
		$('#character1').appendTo($('#characterPool'));
		$('#character2').appendTo($('#characterPool'));
		$('#character3').appendTo($('#characterPool'));
		$('#character4').appendTo($('#characterPool'));
		// fill arrays with the base (starting) values for the hp and attack
		var baseHP = [$('#character1').attr('baseHP'), $('#character2').attr('baseHP'), $('#character3').attr('baseHP'), $('#character4').attr('baseHP')];
		var baseAttack = [$('#character1').attr('baseAttack'), $('#character2').attr('baseAttack'), $('#character3').attr('baseAttack'), $('#character4').attr('baseAttack')];
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
		$('#character1').attr('attack', baseAttack[0]);
		$('#character2').attr('attack', baseAttack[1]);
		$('#character3').attr('attack', baseAttack[2]);
		$('#character4').attr('attack', baseAttack[3]);
	}
});