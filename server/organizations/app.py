import uvicorn
from ariadne import load_schema_from_path
from ariadne.asgi import GraphQL
from ariadne.contrib.federation import make_federated_schema
from starlette.applications import Starlette

from models import db
from resolvers import query, organization, season, division, position, datetime_scalar


async def setup_db():
    await db.set_bind("postgresql://postgres:postgres@organizations-db:5432/postgres")
    await db.gino.create_all()


type_defs = load_schema_from_path("schema.graphql")
schema = make_federated_schema(
    type_defs,
    query,
    organization,
    season,
    division,
    position,
    datetime_scalar,
)

app = Starlette(debug=True, on_startup=[setup_db])
app.mount(
    "/graphql",
    GraphQL(
        schema=schema,
        context_value=lambda request: {
            "request": request,
            "user-id": request.headers.get("user-id"),
        },
    ),
)

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
