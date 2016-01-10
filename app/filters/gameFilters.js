'use strict';

angular
	.module('blackjack.gameFilters', [])
	.filter('cardFileName', function() {
		return function(card) {
			return card.rank + '_of_' + card.suit + '.png';
		};
	});
