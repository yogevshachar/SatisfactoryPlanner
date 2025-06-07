from fastapi import APIRouter, Depends
from dal.base import MachineRepository
from utils.repositories import get_machine_repo

router = APIRouter(tags=["Machines"])


@router.get("/")
async def list_machines(machine_repo: MachineRepository = Depends(get_machine_repo)):
    return await machine_repo.get_all_machines()


@router.get("/{machine_id}")
async def get_machine(machine_id: str, machine_repo: MachineRepository = Depends(get_machine_repo)):
    return await machine_repo.get_machine_by_id(machine_id)
