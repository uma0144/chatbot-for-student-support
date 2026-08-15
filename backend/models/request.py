from pydantic import BaseModel, Field, field_validator


class ChatRequest(BaseModel):
    question: str = Field(
        ...,
        min_length=1,
        max_length=1000,
        description="Student's question (single line in JSON — no raw line breaks inside quotes)",
        json_schema_extra={"example": "Give detailed information about ITM University"},
    )
    language: str = Field(
        default="en",
        description="Response language code: en (English) or hi (Hindi)",
    )

    @field_validator("question")
    @classmethod
    def normalize_question(cls, value: str) -> str:
        cleaned = " ".join(value.split())
        if not cleaned:
            raise ValueError("Question cannot be empty")
        return cleaned