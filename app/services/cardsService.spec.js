'use strict';

describe('blackjack.cardsService module', function() {

	beforeEach(module('blackjack.cardsService'));

	describe('Cards', function() {

		it('should have a function "getSinglePack" that returns a pack composed of 48 cards', inject(function(Cards) {
			var singlePack = Cards.getSinglePack();
			expect(singlePack.length).toBe(48);
		}));

		it('should have a function "getSinglePack" that returns an array of objects describing the cards', inject(function(Cards) {
			var singlePack = Cards.getSinglePack();
			expect(singlePack[0].rank).toBeDefined();
			expect(singlePack[0].suit).toBeDefined();
			expect(singlePack[0].score).toBeDefined();
		}));

		it('should have a function "getInitialPack" that returns a pack composed of six 48-cards packs', inject(function(Cards) {
			var pack = Cards.getInitialPack();
			expect(pack.length).toBe(48 * 6);
		}));

		it('should have a function "getInitialPack" that returns a shuffled pack', inject(function(Cards) {
			var singlePack = Cards.getSinglePack();
			var pack = Cards.getInitialPack();

			var packComp = JSON.stringify(pack.splice(0, 48));
			var singlePackComp = JSON.stringify(singlePack);

			expect(packComp).not.toBe(singlePackComp);
		}));

		it('should have a function "getScore" that returns summed up card scores according to the blackjack rules', inject(function(Cards) {

			expect(Cards.getScore([
				{ score: 10 },
				{ score: 11 }
			])).toBe(21);

			expect(Cards.getScore([
				{ score: 10 },
				{ score: 11 },
				{ score: 2 }
			])).toBe(13);

			expect(Cards.getScore([
				{ score: 10 },
				{ score: 11 },
				{ score: 2 },
				{ score: 6 }
			])).toBe(19);

			expect(Cards.getScore([
				{ score: 10 },
				{ score: 11 },
				{ score: 2 },
				{ score: 6 },
				{ score: 11 }
			])).toBe(20);

			expect(Cards.getScore([
				{ score: 9 },
				{ score: 11 },
				{ score: 11 }
			])).toBe(21);

			expect(Cards.getScore([
				{ score: 10 },
				{ score: 10 },
				{ score: 10 }
			])).toBe(30);

		}));

	});

});

