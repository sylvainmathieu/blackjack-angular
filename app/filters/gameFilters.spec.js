'use strict';

describe('blackjack.gameFilters module', function() {

	beforeEach(module('blackjack.gameFilters'));

	describe('cardFileName', function() {

		it('should build the file name string out of the card object', inject(function(cardFileNameFilter) {
			expect(cardFileNameFilter({ rank: 'jack', suit: 'spades' })).toBe('jack_of_spades.png');
			expect(cardFileNameFilter({ rank: '2', suit: 'hearts' })).toBe('2_of_hearts.png');
		}));

	});

});
