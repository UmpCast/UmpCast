from models import db
from starlette.applications import Starlette
import uvicorn

async def setup_db():
    await db.set_bind("postgresql://postgres:postgres@users-db:5432/postgres")
    await db.gino.create_all()
    
app = Starlette(debug=True, on_startup=[setup_db])

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)