import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app
from app.core.database import Base, AsyncSessionLocal
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

@pytest.fixture(scope="session", autouse=True)
async def setup_db():
    test_engine = create_async_engine("sqlite+aiosqlite:///:memory:", echo=False)
    # Rebind the sessionmaker to the test engine
    AsyncSessionLocal.configure(bind=test_engine)
    
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    yield
    
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
    await test_engine.dispose()

@pytest.mark.asyncio
async def test_agent_query():
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test"
    ) as ac:
        response = await ac.post("/api/v1/agent/query", json={"query": "test query"})
    
    assert response.status_code == 200
    data = response.json()
    assert "thread_id" in data
    assert "plan" in data
    assert "reasoning" in data
