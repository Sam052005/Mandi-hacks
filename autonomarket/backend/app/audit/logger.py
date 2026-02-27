import logging
import hashlib
import json

logger = logging.getLogger(__name__)

def log_action(actor: str, action: str, details: dict):
    # Mock HMAC signature for demo
    m = hashlib.sha256()
    m.update(json.dumps(details, sort_keys=True).encode())
    signature = m.hexdigest()
    
    logger.warning(f"AUDIT LOG: [{actor}] performed '{action}' - Signature: {signature}")
    return signature
