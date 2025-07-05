# tests/test_demand.py
import pytest
from services.factory_builder import compute_total_demand

def test_calculate_demand_for_smart_plating():
    result = compute_total_demand(
        targets=[{'item':"smart_plating", "rate":2}],
    )

    # Check core expectations

    assert isinstance(result, dict)
    assert result["screw"] == 74
    assert result["iron_ingot"] == 46.5
    assert result["iron_ore"] == 46.5
    assert result["iron_rod"] == 28.5
    assert result["iron_plate"] == 12
    assert result["reinforced_iron_plate"] == 2
    assert result["rotor"] == 2
    assert result["smart_plating"] == 2  # Should match the target amount