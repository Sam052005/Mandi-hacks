from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

MOCK_APPROVALS = [
    {
        "id": 1,
        "order_id": 1,
        "product_name": "Apple MacBook Air M3",
        "supplier_id": 1,
        "amount": 114900.0,
        "status": "PENDING"
    }
]

class ApprovalAction(BaseModel):
    action: str  # "approve" or "reject"
    reason: str = ""

@router.get("/")
async def list_approvals():
    return [a for a in MOCK_APPROVALS if a["status"] == "PENDING"]

@router.post("/{approval_id}/action")
async def handle_action(approval_id: int, action: ApprovalAction):
    for a in MOCK_APPROVALS:
        if a["id"] == approval_id:
            a["status"] = "APPROVED" if action.action == "approve" else "REJECTED"
            return {"status": "success", "approval": a}
    return {"status": "not_found"}
