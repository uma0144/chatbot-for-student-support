from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.database.database import get_db
from backend.core.auth import get_current_user

from backend.models.request import ChatRequest
from backend.models.response import ChatResponse

from backend.services.chat_service import chat_service
from backend.database import crud

router = APIRouter()


@router.post("/", response_model=ChatResponse)
def chat(
    request: ChatRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """
    Chat endpoint
    """

    print("\n" + "=" * 80)
    print("CHAT REQUEST")
    print("=" * 80)
    print("Question:", request.question)

    response = chat_service.get_response(request)

    print("\n" + "=" * 80)
    print("CHAT RESPONSE")
    print("=" * 80)
    print(response.answer)

    crud.save_chat(
        db=db,
        user_id=current_user["id"],
        question=request.question,
        answer=response.answer,
    )

    return response


@router.get("/history")
def history(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return crud.get_chat_history(
        db,
        current_user["id"],
    )


@router.delete("/history")
def clear_history(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    crud.clear_chat_history(
        db,
        current_user["id"],
    )

    return {
        "message": "History cleared successfully"
    }