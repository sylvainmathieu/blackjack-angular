'use strict';

angular
	.module('blackjackApp', [
		'blackjack.gameFilters',
		'blackjack.playerDirective',
		'blackjack.cardsService'
	])
	.controller('GameController', ['$scope', 'Cards', function($scope, Cards) {

		$scope.pack = Cards.getInitialPack();

		$scope.gameInProgress = false;

		var resetCurrentTurn = function() {
			$scope.players.forEach(function(player) {
				player.currentTurn = false;
			});
		};

		var changeTurn = function(player) {
			resetCurrentTurn();
			player.currentTurn = true;
			$scope.hit(player);
			$scope.hit(player);
		};

		var dealerHitUntilEnough = function() {
			if (($scope.dealer.score || 0) < 16) {
				$scope.hit($scope.dealer, true);
				dealerHitUntilEnough($scope.dealer);
			}
		};

		var dealersTurn = function() {
			resetCurrentTurn();
			dealerHitUntilEnough();
			$scope.gameInProgress = false;
		};

		var setResults = function() {
			var dealer = $scope.dealer;
			var players = $scope.players;

			players.forEach(function(player) {
				if ((dealer.score > 21 || player.score > dealer.score) && player.score <= 21) {
					player.result = 'win';
				}
				else if (player.score == dealer.score && player.score <= 21) {
					player.result = 'push';
				}
				else {
					player.result = 'lose';
				}
			});
		};

		var resetPlayers = function() {
			$scope.dealer = {};
			$scope.players = [{ number: 1 }, { number: 2 }, { number: 3 }];
		}
		resetPlayers();

		$scope.newRound = function() {
			resetPlayers();

			$scope.gameInProgress = true;

			// Start the round with the first player
			changeTurn($scope.players[0]);
		}

		$scope.stick = function(player) {

			var nextPlayer = $scope.players.find(function(p) {
				return p.number == player.number + 1;
			});

			if (nextPlayer) {
				changeTurn(nextPlayer);
			}
			else {
				dealersTurn();
				setResults();
			}

		}

		$scope.hit = function(player, isDealer) {

			// Take first card in the deck
			var card = $scope.pack.splice(0, 1)[0];

			// Add the card to the player's hand
			player.hand = player.hand || [];
			player.hand.push(card);

			player.score = Cards.getScore(player.hand);

			// Go to the next player if can't take any more cards
			if (player.score >= 21 && !isDealer) {
				$scope.stick(player);
			}

		}

}]);
