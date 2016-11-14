$(document).ready(function() {
	// user clicks on a character to choose attacker
	$('#characterPool').children().on('click', function() {
		
		// clear any messages that may be displaying
		$('#messages').empty();

		/*
			only move the character to the attacker pool if the pool is empty
			if you don't check to see if it is empty, the next character you click on gets appended to the attacker pool
			move the rest of the characters to the available enemies pool
		*/
		if ($('#attackerPool').children().length == 0) {
			$(this).appendTo('#attackerPool');
			$('#characterPool').children().appendTo('#availableEnemies');
		}
	});

	/*
		event listener that waits for user to click on a character
		waits for a div to be clicked and sends the character class to tell the listener that this is the only div class that we're looking for
		when the character is clicked on, the sound assigned to it will play
	*/
	$('div').on('click', '.character', function() {
		
		// King Arthur
		if ($(this).attr('id') == 'character1') {
			var sound = new Audio('assets/sounds/arthur.m4a');
			sound.play();
		}

		// The Black Knight
		else if ($(this).attr('id') == 'character2') {
			 var sound = new Audio('assets/sounds/black_knight.m4a');
			sound.play();	
		}

		// The Knights Who Say Ni
		else if ($(this).attr('id') == 'character3') {
			var sound = new Audio('assets/sounds/knights_who_say_ni.m4a');
			sound.play();
		}

		// The Rabbit of Caerbannog
		else if ($(this).attr('id') == 'character4') {
			var sound = new Audio('assets/sounds/the_rabbit.m4a');
			sound.play();
		}
	});

	/*
		event listener that waits for you to click on a character in the available enemies pool
		when the character is clicked
			the messages are cleared
			if the user has yet to select an enemy, then the character is moved to the enemy pool
	*/
	$('#availableEnemies').on('click', '.character', function() {
		$('#messages').empty();
		if ($('#enemyPool').children().length == 0) {
			$(this).appendTo('#enemyPool');
		}
	});

	/*
		event listener for the button class
	*/
	$('.btn').on('click', function() {
		/*
			user clicks the attack button
		*/
		if ($(this).attr('id') == "attackBtn") {
			// clear the messages
			$('#messages').empty();

			// assign the child elements to variables. This allows us to reference the children without having to use the selecter every time
			var attacker = $('#attackerPool').children();
			var enemy = $('#enemyPool').children();

			/*
				only allow a fight if the user has selected an attacker and enemy
			*/
			if ((attacker.length != 0) && (enemy.length != 0)) {

				// call the attack function, send the attacker and enemy as parameters
				attack(attacker, enemy);

				// attack killed the enemy
				if (enemy.children().text() <= 0) {

					/*	
						if there's still characters left to attack
							assign 0 to the current enemy's text (i.e. its HP)
							move the dead enemy to the dead pool
					*/
					if ($('#availableEnemies').children().length != 0) {
						enemy.children().text(0);
						enemy.appendTo($('#deadPool'));	
					}

					/*	
						the final enemy has been defeated!
						display a message informing user it has won
						disable attack button, enable/show the reset button
					*/
					else {
						enemy.appendTo($('#deadPool'));
						displayMessage("You have fought well, good sir knight!");
						$(this).prop('disabled', true);
						$('#reset').prop('disabled', false);
						$('#reset').show();
					}
				}

				/*
					enemy is still standing and counters
					Since we follow Pokemon rules, the characters take turns attacking each other
						So if the attack drains the enemy of all of its HP, the enemy dies and cannot counter (b/c it's dead)
				*/
				else {

					// run the counter function, send attacker and enemy as parameters
					counter(attacker, enemy);

					/*
						if the counter attack drains the attacker of its HP, display 0 to avoid the HP showing as a negative number
						inform the user of this shameful defeat
						disable the attack button, enable/show the reset button
					*/
					if (attacker.children().text() <= 0) {
						attacker.children().text("0");
						displayMessage("Run away! Run away!<br>You have been defeated!");
						$(this).prop('disabled', true);
						$('#reset').prop('disabled', false);
						$('#reset').show();
					}
				}
			}

			/*
				if the user has not selected an attacker yet, inform them of the error and do nothing else until they choose an attacker
			*/
			else if (attacker.length == 0) {
				displayMessage("You have not selected an attacker. Please select an attacker then try again.");
			}

			/*
				if the user has not selected an enemy yet, inform them of the error and do nothing else until they choose an enemy
			*/
			else if (enemy.length == 0) {
				displayMessage("You have not selected an enemy. Please select an enemy then chunk the Holy Hand Grenade at him!");
			}
		}

		/*
			user clicks the reset button
		*/
		else if ($(this).attr('id') == 'reset') {
			$('#messages').empty();
			reset();
		}
	});

	/*
		Recall:
			var attacker = $('#attackerPool').children();
			var enemy = $('#enemyPool').children();
	*/
	function attack(attacker, enemy) {
		/*
			assign the difference between the enemy's HP and the attacker's attack power to enemyHP
			display enemy's new HP
		*/
		var enemyHP = enemy.children().next().text() - attacker.attr('data-attack');
		enemy.children().next().html(enemyHP);

		/*
			display the results from the attack
			add increase the attacker's attack power by its base attack power and then update the attack attribute
		*/
		$('#messages').html("<p>" + attacker.attr('data-name') + " attacked " + enemy.attr('data-name') + " for " + attacker.attr('data-attack') +" damage</p>");
		var attackerPower = parseInt(attacker.attr('data-attack')) + parseInt(attacker.attr('data-baseAttack'));
		attacker.attr('data-attack', attackerPower);
	}

	/*
		Recall:
			var attacker = $('#attackerPool').children();
			var enemy = $('#enemyPool').children();
	*/
	function counter(attacker, enemy) {

		/*
			assign the difference between the attacker's HP and the enemy's attack power to attackerHP
			display the attacker's new HP
		*/
		var attackerHP = attacker.children().next().text() - enemy.attr('data-counter');
		attacker.children().next().html(attackerHP);

		/*
			append the result of the counter attack to the message area
		*/
		$('#messages').append("<p>" + enemy.attr('data-name') + " countered for " + enemy.attr('data-counter') + " damage</p>");;
	}

	/*
		function to display a message
	*/
	function displayMessage(message) {
		$('#messages').html(message);
	}

	/*
		function to move characters back to the character pool
		reset all HP and attack attributes
		clear messages
		enable the attack button
		disable/hide the reset button
	*/
	function reset() {

		/*
			move all characters back to the character pool
		*/
		$('#character1').appendTo($('#characterPool'));
		$('#character2').appendTo($('#characterPool'));
		$('#character3').appendTo($('#characterPool'));
		$('#character4').appendTo($('#characterPool'));

		/*
			fill arrays with the base (starting) values for the hp and attack
		*/
		var baseHP = [$('#character1').attr('data-baseHP'),
				$('#character2').attr('data-baseHP'),
				$('#character3').attr('data-baseHP'),
				$('#character4').attr('data-baseHP')];

		var baseAttack = [$('#character1').attr('data-baseAttack'),
				$('#character2').attr('data-baseAttack'),
				$('#character3').attr('data-baseAttack'),
				$('#character4').attr('data-baseAttack')];

		/*
			assign the base hp to the hp attribute
		*/
		$('#character1').children().html(baseHP[0]);
		$('#character2').children().html(baseHP[1]);
		$('#character3').children().html(baseHP[2]);
		$('#character4').children().html(baseHP[3]);

		/*
			assign the base attack to the attack attribute
		*/
		$('#character1').attr('data-attack', baseAttack[0]);
		$('#character2').attr('data-attack', baseAttack[1]);
		$('#character3').attr('data-attack', baseAttack[2]);
		$('#character4').attr('data-attack', baseAttack[3]);

		/*
			clear the messages
		*/
		$('#messages').empty();

		/*
			enable the attack button
			disable/hide the reset button
		*/
		$('#attackBtn').prop('disabled', false);
		$('#reset').prop('disabled', true);
		$('#reset').hide();
	}
});