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
			attack($('#attackerPool').children(), $('#enemyPool').children());
			if (parseInt(enemy.attr('hp')) <= 0) {
				enemy.appendTo($('#deadPool'));
			}

			if (parseInt(attacker.attr('hp')) <= 0) {
				// create reset function that moves all characters back to #characterPool and resets all attributes
			}
		}
	});

	function attack(attacker, enemy) {
		var enemyDamage = enemy.attr('hp') - attacker.attr('attack');
		enemy.attr('hp', enemyDamage);

		var attackerPower = parseInt(attacker.attr('attack')) + parseInt(attacker.attr('baseAttack'));
		attacker.attr('attack', attackerPower);

		var attackerDamage = attacker.attr('hp') - enemy.attr('counter');
		attacker.attr('hp', attackerDamage);
	}
});