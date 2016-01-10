'use strict';

describe('Blackjack app', function() {

	beforeEach(function() {
      browser.get('index.html');
    });

	it('should let you start a round', function() {
		var player1 = $('.player1');

		expect(player1.all(by.repeater('card in player.hand')).count()).toBe(0);

		$('.newRound').click();

		expect(player1.all(by.repeater('card in player.hand')).count()).toBe(2);
	});

	it('should let the player click "hit" to get a new card', function() {
		var player1 = $('.player1');
		var player2 = $('.player2');
		var player3 = $('.player3');

		$('.newRound').click();

		$(".player1 .score").getText().then(function(score) {
			if (score < 21) {
				expect(player2.all(by.repeater('card in player.hand')).count()).toBe(0);
				$('.player1 .hit').click();
				expect(player1.all(by.repeater('card in player.hand')).count()).toBe(3);
			}
			else {
				expect(player1.all(by.repeater('card in player.hand')).count()).toBe(2);
				expect(player2.all(by.repeater('card in player.hand')).count()).toBe(2);
				expect(player3.all(by.repeater('card in player.hand')).count()).toBe(0);
				$('.player1 .hit').click();
				expect(player2.all(by.repeater('card in player.hand')).count()).toBe(3);
			}
		});

	});

	it('should let the player click "stick" to pass its turn', function() {
		var player1 = $('.player1');
		var player2 = $('.player2');
		var player3 = $('.player3');

		$('.newRound').click();

		$(".player1 .score").getText().then(function(score) {
			if (score < 21) {
				expect(player2.all(by.repeater('card in player.hand')).count()).toBe(0);
				$('.player1 .stick').click();
				expect(player2.all(by.repeater('card in player.hand')).count()).toBe(2);
			}
			else {
				expect(player1.all(by.repeater('card in player.hand')).count()).toBe(2);
				expect(player2.all(by.repeater('card in player.hand')).count()).toBe(2);
				expect(player3.all(by.repeater('card in player.hand')).count()).toBe(0);
				$('.player1 .stick').click();
				expect(player3.all(by.repeater('card in player.hand')).count()).toBe(2);
			}
		});

	});


});