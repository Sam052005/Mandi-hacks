from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter()

MOCK_PRODUCTS = [
    {
        "id": 1,
        "name": "Sony WH-1000XM5 Wireless Headphones",
        "description": "Industry leading noise canceling headphones.",
        "price": 29999.0,
        "stock_quantity": 42
    },
    {
        "id": 2,
        "name": "Apple MacBook Air M3",
        "description": "Supercharged by M3, the MacBook Air is light and powerful.",
        "price": 114900.0,
        "stock_quantity": 15
    },
    {
        "id": 3,
        "name": "Keychron Q1 Pro Mechanical Keyboard",
        "description": "A fully customizable 75% layout custom mechanical keyboard.",
        "price": 16500.0,
        "stock_quantity": 8
    }
]

@router.get("/")
async def list_products():
    return MOCK_PRODUCTS
