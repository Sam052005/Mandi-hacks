import json
from langchain_core.messages import SystemMessage, HumanMessage
from langchain_openai import ChatOpenAI
from app.agents.state import AgentState
from app.core.database import AsyncSessionLocal
from app.models.product import Product
from sqlalchemy import select
from app.core.config import settings

# Placeholder definition for LLM. Can be extended to use other LangChain chat models.
llm = ChatOpenAI(model="gpt-4o-mini", api_key=settings.LLM_API_KEY or "dummy_key")

async def discovery_node(state: AgentState) -> dict:
    query = state["query"]
    
    # Simulated search via simple query
    async with AsyncSessionLocal() as session:
        result = await session.execute(select(Product))
        products = result.scalars().all()
        
    product_descriptions = "\n".join([
        f"ID: {p.id}, Name: {p.name}, Price: {p.price}, Desc: {p.description}, Supplier: {p.supplier_id}" 
        for p in products
    ])
    
    if not products:
        return {
            "selected_product_id": None,
            "confidence": 0.0,
            "reasoning": ["Catalog is empty, no products found."]
        }
    
    system_prompt = f"""
    You are a Discovery Agent for AutonoMarket.
    Your task is to find the most relevant product from the catalog based on the user's query.
    Return ONLY a valid JSON object with 'product_id', 'product_name', 'price', 'supplier_id', and 'confidence' (0.0 to 1.0).
    If no product matches, return product_id as null.
    
    Catalog:
    {product_descriptions}
    """
    
    try:
        response = await llm.ainvoke([
            SystemMessage(content=system_prompt),
            HumanMessage(content=query)
        ])
        content = response.content.replace("```json", "").replace("```", "").strip()
        data = json.loads(content)
        
        return {
            "selected_product_id": data.get("product_id"),
            "selected_product_name": data.get("product_name"),
            "original_price": data.get("price"),
            "supplier_id": data.get("supplier_id"),
            "confidence": float(data.get("confidence", 0.0)),
            "reasoning": [f"Discovery found product '{data.get('product_name')}' with confidence {data.get('confidence')}"]
        }
    except Exception as e:
        return {
            "selected_product_id": None,
            "confidence": 0.0,
            "reasoning": [f"Discovery failed or parse error: {str(e)}"]
        }
