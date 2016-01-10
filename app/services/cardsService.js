'use strict';

angular
	.module('blackjack.cardsService', [])
	.factory('Cards', function() {

		var getSinglePack = function() {
			var cardRanks = [
				{ name: 'ace', score: 11 },
				{ name: '2', score: 2 },
				{ name: '3', score: 3 },
				{ name: '4', score: 4 },
				{ name: '5', score: 5 },
				{ name: '6', score: 6 },
				{ name: '7', score: 7 },
				{ name: '8', score: 8 },
				{ name: '9', score: 9 },
				{ name: 'jack', score: 10 },
				{ name: 'queen', score: 10 },
				{ name: 'king', score: 10 }
			];

			var cardSuits = ['clubs', 'diamonds', 'hearts', 'spades'];

			// Generate a pack
			var pack = [];
			cardRanks.forEach(function(rank) {
				cardSuits.forEach(function(suit) {
					pack.push({
						rank: rank.name,
						suit: suit,
						score: rank.score
					});
				});
			});

			return pack;
		};

		return {

			getSinglePack: getSinglePack,

			getInitialPack: function() {

				var pack = getSinglePack();

				// Create the final pack composed of 6 packs...
				var packs = [];
				for (var i = 0; i < 6; i++) {
					packs = packs.concat(pack);
				}

				// ... and shuffle the cards
				var shuffledPacks = [];
				var initialPackLength = packs.length
				for (var i = 0; i < initialPackLength ; i++) {
					var randomIndex = Math.floor(Math.random() * packs.length);
					var pulledCard = packs.splice(randomIndex, 1)[0];
					shuffledPacks.push(pulledCard);
				}

				return shuffledPacks;
			},

			getScore: function(cards) {

				// Counting the number of aces for soft hands
				var nbAces = 0;
				cards.forEach(function(card) {
					if (card.score == 11) {
						nbAces += 1;
					}
				});

				// Total counting all the aces as 11 points
				var score = 0;
				cards.forEach(function(card) {
					score += card.score;
				});

				// Reducing the score regarding the aces if necessary
				for (var i = 0; i < nbAces && score > 21; i++) {
					score -= 10;
				}

				return score;
			}

		};
	});
