import os

from fastapi import FastAPI
from routers import recipes, items, machines, planner
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from contextlib import asynccontextmanager
from dal.mongo import MongoItemRepository, MongoRecipeRepository, MongoMachineRepository


@asynccontextmanager
async def lifespan(app: FastAPI):
    client = AsyncIOMotorClient(os.environ.get("MONGO_URI", "mongodb://localhost:27017"))
    db = client['satisfactory']

    # Initialize repositories and store in app state
    app.state.item_repo = MongoItemRepository(db)
    app.state.recipe_repo = MongoRecipeRepository(db)
    app.state.machine_repo = MongoMachineRepository(db)

    yield  # App is running

    # Shutdown cleanup
    client.close()


app = FastAPI(debug=True, lifespan=lifespan)

app.include_router(recipes.router, prefix="/recipes")
app.include_router(items.router, prefix="/items")
app.include_router(machines.router, prefix="/machines")
app.include_router(planner.router, prefix="/planner")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def is_alive():
    return 'alive'
