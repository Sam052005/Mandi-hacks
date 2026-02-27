import json
import logging
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import SystemMessage, HumanMessage
from app.agents.state import AgentState
from app.core.config import settings

logger = logging.getLogger(__name__)

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

# Initialize Gemini Flash
llm = None
if settings.GOOGLE_API_KEY:
    try:
        llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", google_api_key=settings.GOOGLE_API_KEY)
    except Exception as e:
        logger.error(f"Failed to initialize Gemini: {e}")

async def discovery_node(state: AgentState) -> dict:
    query = state["query"]
    
    if not llm:
        # Fallback to faked logic if no API Key
        selected = MOCK_PRODUCTS[0]
        if "macbook" in query.lower(): selected = MOCK_PRODUCTS[1]
        elif "keyboard" in query.lower(): selected = MOCK_PRODUCTS[2]
        
        return {
            "selected_product_id": selected["id"],
            "selected_product_name": selected["name"],
            "original_price": selected["price"],
            "supplier_id": 1,
            "confidence": 0.9,
            "reasoning": [f"Discovery Agent (Simulated) identified '{selected['name']}'."]
        }

    catalog_context = json.dumps(MOCK_PRODUCTS, indent=2)
    system_prompt = f"""
    You are the Discovery Agent for AutonoMarket.
    Your task: Match the user's query to the most relevant product in our catalog.
    
    Catalog:
    {catalog_context}
    
    Instructions:
    1. Analyze the user intent.
    2. Select the best match ID.
    3. Return ONLY a JSON object: {{"product_id": int, "reasoning": "brief explanation"}}
    """

    try:
        resp = await llm.ainvoke([SystemMessage(content=system_prompt), HumanMessage(content=query)])
        data = json.loads(resp.content.replace("```json", "").replace("```", "").strip())
        
        product_id = data.get("product_id")
        selected = next((p for p in MOCK_PRODUCTS if p["id"] == product_id), MOCK_PRODUCTS[0])
        
        return {
            "selected_product_id": selected["id"],
            "selected_product_name": selected["name"],
            "original_price": selected["price"],
            "supplier_id": 1,
            "confidence": 0.98,
            "reasoning": [f"[Discovery] {data.get('reasoning', 'Found matching product.')}"]
        }
    except Exception as e:
        logger.error(f"Discovery LLM Error: {e}")
        return {"reasoning": [f"[Discovery] Error in reasoning: {str(e)}"]}
