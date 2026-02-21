import json
from langchain_core.messages import SystemMessage, HumanMessage
from langchain_openai import ChatOpenAI
from app.agents.state import AgentState
from app.core.config import settings

llm = ChatOpenAI(model="gpt-4o-mini", api_key=settings.LLM_API_KEY or "dummy_key")

async def negotiation_node(state: AgentState) -> dict:
    product_id = state.get("selected_product_id")
    original_price = state.get("original_price", 0)
    
    if not product_id or not original_price:
         return {"reasoning": ["Skipped negotiation because no product was selected."]}
         
    system_prompt = f"""
    You are a Negotiation Agent simulating a negotiation with a supplier.
    The user wants to buy a product originally priced at {original_price}.
    You can negotiate a discount between 0% and 15% depending on standard retail margins.
    Return ONLY a valid JSON object with 'final_price' and 'discount_percentage'.
    Do not return markdown, just raw JSON.
    """
    
    try:
        response = await llm.ainvoke([
            SystemMessage(content=system_prompt),
            HumanMessage(content="Negotiate the best price for this product.")
        ])
        
        content = response.content.replace("```json", "").replace("```", "").strip()
        data = json.loads(content)
        final_price = float(data.get("final_price", original_price))
        
        return {
            "final_price": final_price,
            "reasoning": [f"Negotiation achieved final price: {final_price} from original {original_price} (-{data.get('discount_percentage')}%)"]
        }
    except Exception as e:
        return {
            "final_price": original_price,
            "reasoning": [f"Negotiation failed, kept original price: {str(e)}"]
        }
