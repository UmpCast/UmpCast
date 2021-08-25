# -*- coding: utf-8 -*-
# snapshottest: v1 - https://goo.gl/zC4yUc
from __future__ import unicode_literals

from snapshottest import Snapshot


snapshots = Snapshot()

snapshots['UserQueryTest::test_me 1'] = '''{
    "data": {
        "me": {
            "id": "1",
            "lastLogin": null,
            "email": "ben_franklin@upenn.edu",
            "firstName": "Ben",
            "lastName": "Franklin"
        }
    }
}'''

snapshots['UserQueryTest::test_me_organizations_all 1'] = '''{
    "data": {
        "me": {
            "organizations": [
                {
                    "name": "University of Pennsylvania"
                },
                {
                    "name": "Georgetown University"
                }
            ]
        }
    }
}'''

snapshots['UserQueryTest::test_me_organizations_member 1'] = '''{
    "data": {
        "me": {
            "organizations": [
                {
                    "name": "Georgetown University"
                }
            ]
        }
    }
}'''

snapshots['UserQueryTest::test_me_organizations_owner 1'] = '''{
    "data": {
        "me": {
            "organizations": [
                {
                    "name": "University of Pennsylvania"
                }
            ]
        }
    }
}'''

snapshots['UserQueryTest::test_me_season_admin 1'] = '''{
    "data": {
        "me": {
            "seasons": [
                {
                    "name": "Admin Season"
                }
            ]
        }
    }
}'''

snapshots['UserQueryTest::test_me_season_all 1'] = '''{
    "data": {
        "me": {
            "seasons": [
                {
                    "name": "Referee Season"
                },
                {
                    "name": "Admin Season"
                }
            ]
        }
    }
}'''

snapshots['UserQueryTest::test_me_season_referee 1'] = '''{
    "data": {
        "me": {
            "seasons": [
                {
                    "name": "Referee Season"
                }
            ]
        }
    }
}'''

snapshots['UserQueryTest::test_me_unauthorized 1'] = '''{
    "errors": [
        {
            "message": "You do not have permission to perform this action",
            "locations": [
                {
                    "line": 3,
                    "column": 17
                }
            ],
            "path": [
                "me"
            ]
        }
    ],
    "data": {
        "me": null
    }
}'''
