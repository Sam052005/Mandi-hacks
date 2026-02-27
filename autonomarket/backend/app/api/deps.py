from typing import AsyncGenerator
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from app.core.config import settings

oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/auth/login")

class MockUser:
    def __init__(self, email):
        self.id = 1
        self.email = email
        self.wallet_address = "0xMockWalletAddressForDemo"

async def get_current_user(token: str = Depends(oauth2_scheme)) -> MockUser:
    # Accept any token for demo
    return MockUser("demo@autonomarket.com")
