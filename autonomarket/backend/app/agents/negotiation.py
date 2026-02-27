import json
import logging
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import SystemMessage, HumanMessage
from app.agents.state import AgentState
from app.core.config import settings

logger = logging.getLogger(__name__)

# Initialize Gemini Flash
llm = None
if settings.GOOGLE_API_KEY:
    try:
        llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", google_api_key=settings.GOOGLE_API_KEY)
    except Exception as e:
        logger.error(f"Failed to initialize Gemini: {e}")

async def negotiation_node(state: AgentState) -> dict:
    product_name = state.get("selected_product_name")
    original_price = state.get("original_price", 0)
    
    if not llm:
        final_price = original_price * 0.92
        return {
            "final_price": final_price,
            "reasoning": [f"[Negotiation] Simulated bargaining secured 8% discount. Final: ₹{final_price:,.2f}"]
        }

    system_prompt = f"""
    You are the Negotiation Agent for AutonoMarket.
    You are bargaining with a supplier for '{product_name}' (Original Price: ₹{original_price}).
    
    Goal: Secure a realistic discount (2% to 12%) based on volume or market trends.
    
    Return ONLY a JSON object: {{"final_price": float, "bargaining_log": "short summary of the verbal battle"}}
    """

    try:
        resp = await llm.ainvoke([SystemMessage(content=system_prompt), HumanMessage(content="Start negotiation.")])
        data = json.loads(resp.content.replace("```json", "").replace("```", "").strip())
        
        final_price = data.get("final_price", original_price)
        
        return {
            "final_price": final_price,
            "reasoning": [f"[Negotiation] {data.get('bargaining_log', 'Successfully negotiated a better deal.')}"]
        }
    except Exception as e:
        logger.error(f"Negotiation LLM Error: {e}")
        return {"reasoning": [f"[Negotiation] Negotiation process encountered an error, falling back to original price."]}
