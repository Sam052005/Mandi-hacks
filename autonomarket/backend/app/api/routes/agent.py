import uuid
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import Optional
from app.agents.orchestrator import agent_executor

router = APIRouter()

class AgentQueryRequest(BaseModel):
    query: str
    thread_id: Optional[str] = None

@router.post("/query")
async def agent_query(request: AgentQueryRequest):
    thread_id = request.thread_id or str(uuid.uuid4())
    config = {"configurable": {"thread_id": thread_id}}
    
    initial_state = {
        "query": request.query,
        "reasoning": [],
        "plan": ["Discovery", "Negotiation", "Routing", "Recommendation"]
    }
    
    # Run the graph until it finishes or hits an interrupt
    async for event in agent_executor.astream(initial_state, config=config):
        pass 
        
    state_data = agent_executor.get_state(config)
    state = state_data.values
    is_interrupted = len(state_data.next) > 0
    
    return {
        "thread_id": thread_id,
        "plan": state.get("plan", []),
        "selected_product": {
            "id": state.get("selected_product_id"),
            "name": state.get("selected_product_name")
        } if state.get("selected_product_id") else None,
        "final_price": state.get("final_price"),
        "confidence": state.get("confidence"),
        "require_approval": state.get("require_approval"),
        "is_waiting_for_approval": is_interrupted and "cerebrum_gate" in state_data.next,
        "reasoning": state.get("reasoning", [])
    }
