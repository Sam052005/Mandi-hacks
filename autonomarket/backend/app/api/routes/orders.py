from fastapi import APIRouter, Depends
from app.api.deps import get_current_user

router = APIRouter()

MOCK_ORDERS = [
    {
        "id": 1,
        "user_id": 1,
        "total_amount": 29999.0,
        "status": "PROCESSING",
        "product_name": "Sony WH-1000XM5 Wireless Headphones"
    }
]

@router.get("/")
async def list_orders(current_user: dict = Depends(get_current_user)):
    # Return mock orders regardless
    return MOCK_ORDERS
