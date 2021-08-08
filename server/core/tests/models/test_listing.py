from django.test import TestCase
from core.models import Listing, Game, Position, UserSeason, Division
from model_bakery import baker
from django.db import IntegrityError


class ListingTest(TestCase):
    def test_create(self):
        game = baker.make(Game)
        position = baker.make(Position)
        user_season = baker.make(UserSeason)
        listing = Listing.objects.create(
            game=game,
            position=position,
            user_season=user_season,
        )
        self.assertIsInstance(listing, Listing)

    def test_str(self):
        game = baker.make(Game)
        position = baker.make(Position)
        listing = Listing.objects.create(
            game=game,
            position=position,
            user_season=None,
        )
        self.assertEqual(
            str(listing),
            f"{game} {position.name}",
        )

    def test_game_non_nullable(self):
        self.assertRaises(
            IntegrityError,
            lambda: Listing.objects.create(
                game=None,
                position=baker.make(Position),
                user_season=None,
            ),
        )

    def test_position_non_nullable(self):
        self.assertRaises(
            IntegrityError,
            lambda: Listing.objects.create(
                game=baker.make(Game),
                position=None,
                user_season=None,
            ),
        )

    def test_user_season_nullable(self):
        listing = Listing.objects.create(
            game=baker.make(Game),
            position=baker.make(Position),
            user_season=None,
        )
        self.assertIsNone(listing.user_season)

    def test_date_created_auto_now_add(self):
        listing = baker.make(Listing)
        self.assertIsNotNone(listing.date_created)

    def test_create_listings_from_game_signal_on_game_create(self):
        division = baker.make(Division)
        positions = baker.make(Position, division=division, _quantity=3)
        game = baker.make(Game, division=division)
        for position in positions:
            self.assertEqual(
                Listing.objects.filter(game=game, position=position).count(), 1
            )
            self.assertEqual(
                Listing.objects.get(game=game, position=position).user_season, None
            )

    def test_not_create_listings_from_game_signal_on_game_update(self):
        division_1 = baker.make(Division)
        baker.make(Position, division=division_1, _quantity=3)
        game = baker.make(Game, division=division_1)
        self.assertEqual(Listing.objects.count(), 3)

        division_2 = baker.make(Division)
        baker.make(Position, division=division_2, _quantity=4)
        game.division = division_2
        game.save()
        self.assertEqual(Listing.objects.count(), 3)
