from fastapi import APIRouter
from examples.graph_example import get_mock_graph
from models.graph import FactoryGraph

router = APIRouter()

@router.get("/mock/factory-graph", response_model=FactoryGraph)
def mock_graph():
    return get_mock_graph()