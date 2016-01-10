'use strict';

angular
	.module('blackjack.playerDirective', [])
	.directive('blackjackPlayer', function() {
		return {
			restrict: 'E',
			scope: {
				player: '=playerData',
				playerType: '=playerType',
				hit: '=hit',
				stick: '=stick'
			},
			templateUrl: 'directives/playerDirective.tpl.html',
		};
	});
