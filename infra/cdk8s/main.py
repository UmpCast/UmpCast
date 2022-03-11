#!/usr/bin/env python
from constructs import Construct

from cdk8s import App, Chart
from service import UmpCastService


class MyChart(Chart):
    def __init__(self, scope: Construct, id: str):
        super().__init__(scope, id)

        UmpCastService(
            self,
            id="gateway",
            image="jonathankao97/umpcast-gateway:latest",
            port=4000,
            container_port=4000,
        )

        UmpCastService(
            self,
            id="users",
            image="jonathankao97/umpcast-users-service:latest",
            port=8000,
            container_port=8000,
        )


app = App()
MyChart(app, "cdk8s")

app.synth()
