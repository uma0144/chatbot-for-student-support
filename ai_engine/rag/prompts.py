"""
Shared RAG answer prompt — always produce a helpful student-facing reply.
"""

REFUSAL_PHRASES = (
    "couldn't find",
    "could not find",
    "not in the knowledge base",
    "not available in the context",
    "don't have enough information",
    "do not have enough information",
    "i don't know",
    "no information available",
)

OFFICIAL_FOOTER = (
    "\n\nFor exact official figures, visit www.itmuniversity.ac.in or contact "
    "admission@itmuniversity.ac.in | 1800-270-0031."
)


def is_refusal(answer: str) -> bool:
    lower = answer.lower()
    return any(phrase in lower for phrase in REFUSAL_PHRASES)


def build_answer_prompt(context: str, question: str, question_note: str = "") -> str:
    return f"""
You are the AI Student Support Assistant for ITM University Gwalior.

Answer the student's question using the CONTEXT below.

Rules:
1. ALWAYS write a helpful, complete answer. Never refuse to help.
2. NEVER say "I couldn't find", "not in the knowledge base", "I don't know", or similar.
3. The question may have spelling mistakes (e.g. "stuature" = structure, "btech" = B.Tech, "aiml" = AI/ML).
   Infer the intended meaning and answer it.
4. Use facts from CONTEXT. Combine related sections if needed (fees, eligibility, programme list).
5. If exact branch-specific data is missing, give the closest official range or policy from context
   (e.g. general B.Tech fee band for B.Tech AI/ML) and mention the official fee PDF link if present.
6. Use bullet points for lists. Be clear and professional.
7. If context is partial, still answer with what is available and add official contact details from context.

==========================
CONTEXT
==========================

{context if context.strip() else "(Use general ITM contacts: admission@itmuniversity.ac.in, 1800-270-0031, www.itmuniversity.ac.in)"}

==========================
STUDENT QUESTION
==========================

{question}{question_note}

==========================
YOUR ANSWER (helpful, never a refusal)
==========================
"""


def build_retry_prompt(context: str, question: str, question_note: str = "") -> str:
    return f"""
The student asked about ITM University. You MUST answer — do not refuse.

Extract every relevant fact from CONTEXT for this question. If the exact detail is missing,
provide the closest related official information (programme fees, eligibility, contacts, links).

CONTEXT:
{context}

QUESTION: {question}{question_note}

Write a direct, helpful answer with specifics from the context. End with admission contact if useful.
Do NOT say you could not find information.
"""
