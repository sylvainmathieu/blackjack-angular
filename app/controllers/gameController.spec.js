'use strict';

describe('blackjackApp', function() {

	beforeEach(module('blackjackApp'));

	describe('GameController', function() {

		it('should create initially 1 dealer, 3 players and a pack of cards', inject(function($controller) {
			var scope = {};
			$controller('GameController', { $scope: scope });

			expect(scope.dealer).toBeDefined();
			expect(scope.players).toBeDefined();
			expect(scope.players.length).toBe(3);
			expect(scope.pack).toBeDefined();
			expect(scope.pack.length).toBe(48 * 6);
			expect(scope.gameInProgress).toBeDefined();
			expect(scope.gameInProgress).toBe(false);
		}));

		it('should have a function in $scope to start a new round', inject(function($controller) {
			var scope = {};
			$controller('GameController', { $scope: scope });

			expect(scope.gameInProgress).toBe(false);
			expect(scope.players[0].currentTurn).not.toBeDefined();
			scope.newRound();

			expect(scope.gameInProgress).toBe(true);
			expect(scope.players[0].currentTurn).toBe(true);
			expect(scope.players[0].hand).toBeDefined();
			expect(scope.players[0].hand.length).toBe(2);
			expect(scope.players[0].score).toBeGreaterThan(3);
		}));


		it('should have a function "hit" in $scope for the current player to take a new card', inject(function($controller) {
			var scope = {};
			$controller('GameController', { $scope: scope });

			scope.newRound();
			expect(scope.players[0].hand.length).toBe(2);

			scope.hit(scope.players[0]);
			expect(scope.players[0].hand.length).toBe(3);
		}));

		it('should have a function "stick" in $scope for the current player to pass its turn', inject(function($controller) {
			var scope = {};
			$controller('GameController', { $scope: scope });

			scope.newRound();
			scope.hit(scope.players[0]);
			expect(scope.players[0].hand.length).toBe(3);

			if (scope.players[0].score < 21) {
				expect(scope.players[0].currentTurn).toBe(true);
				scope.stick(scope.players[0]);
				expect(scope.players[0].currentTurn).toBe(false);
			}
			else {
				expect(scope.players[0].currentTurn).toBe(false);
			}

			expect(scope.players[0].hand.length).toBe(3);
			expect(scope.players[1].currentTurn).toBe(true);
			expect(scope.players[1].hand.length).toBe(2);
		}));

		it('should let the dealer play after all the players have finished playing', inject(function($controller) {
			var scope = {};
			$controller('GameController', { $scope: scope });

			scope.newRound();
			expect(scope.gameInProgress).toBe(true);
			scope.stick(scope.players[0]);
			scope.stick(scope.players[1]);
			scope.stick(scope.players[2]);

			expect(scope.dealer.hand).toBeDefined();
			expect(scope.dealer.hand.length).toBeGreaterThan(1);
			expect(scope.gameInProgress).toBe(false);
		}));

		it('should set the results for every player when the round finishes', inject(function($controller) {

			var scope = {};
			$controller('GameController', { $scope: scope });

			scope.newRound();
			expect(scope.gameInProgress).toBe(true);
			scope.stick(scope.players[0]);
			scope.stick(scope.players[1]);
			scope.stick(scope.players[2]);
			expect(scope.gameInProgress).toBe(false);

			expect(scope.players[0].result).toBeDefined();
			expect(['win', 'push', 'lose']).toContain(scope.players[0].result);

			expect(scope.players[1].result).toBeDefined();
			expect(['win', 'push', 'lose']).toContain(scope.players[1].result);

			expect(scope.players[2].result).toBeDefined();
			expect(['win', 'push', 'lose']).toContain(scope.players[2].result);
		}));

		it('should let you start another round', inject(function($controller) {

			var scope = {};
			$controller('GameController', { $scope: scope });

			scope.newRound();
			expect(scope.gameInProgress).toBe(true);
			scope.stick(scope.players[0]);
			scope.stick(scope.players[1]);
			scope.stick(scope.players[2]);
			expect(scope.gameInProgress).toBe(false);

			scope.newRound();
			expect(scope.gameInProgress).toBe(true);

		}));

	});

});
