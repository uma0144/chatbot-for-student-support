from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
import json

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

    try:
        response = chat_service.get_response(request)
    except RuntimeError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    except Exception as exc:
        print(f"Chat error: {exc}")
        raise HTTPException(
            status_code=500,
            detail="The chat service encountered an error. Check the backend logs.",
        ) from exc

    print("\n" + "=" * 80)
    print("CHAT RESPONSE")
    print("=" * 80)
    print(response.answer)

    try:
        crud.save_chat(
            db=db,
            user_id=current_user["id"],
            question=request.question,
            answer=response.answer,
        )
    except Exception as exc:
        print(f"Warning: failed to save chat history: {exc}")

    return response


@router.post("/stream")
def chat_stream(
    request: ChatRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """
    Stream chat response token-by-token (ChatGPT-style SSE).
    """

    print("\n" + "=" * 80)
    print("CHAT STREAM REQUEST")
    print("=" * 80)
    print("Question:", request.question)

    def event_stream():
        try:
            stream, answer_holder = chat_service.stream_answer_text(
                request.question, language=request.language
            )
            for event_type, payload in stream:
                if event_type == "token":
                    yield f"data: {json.dumps({'type': 'token', 'content': payload})}\n\n"
                elif event_type == "replace":
                    yield f"data: {json.dumps({'type': 'replace', 'content': payload})}\n\n"

            answer = answer_holder[0]
            yield f"data: {json.dumps({'type': 'done', 'answer': answer})}\n\n"
        except RuntimeError as exc:
            yield f"data: {json.dumps({'type': 'error', 'detail': str(exc)})}\n\n"
            return
        except Exception as exc:
            print(f"Chat stream error: {exc}")
            yield f"data: {json.dumps({'type': 'error', 'detail': 'The chat service encountered an error. Check the backend logs.'})}\n\n"
            return

        answer = answer_holder[0]
        if answer:
            try:
                crud.save_chat(
                    db=db,
                    user_id=current_user["id"],
                    question=request.question,
                    answer=answer,
                )
            except Exception as exc:
                print(f"Warning: failed to save chat history: {exc}")

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )


@router.get("/history")
def history(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    rows = crud.get_chat_history(db, current_user["id"])
    return [
        {
            "id": row.id,
            "question": row.question,
            "answer": row.answer,
        }
        for row in rows
    ]


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
