import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq

# Load environment variables
load_dotenv()


class LLMModel:
    """
    Wrapper class for the Groq LLM.
    """

    def __init__(self):

        self.llm = ChatGroq(
            model=os.getenv("LLM_MODEL", "llama-3.3-70b-versatile"),
            temperature=float(os.getenv("TEMPERATURE", 0.2)),
            api_key=os.getenv("GROQ_API_KEY"),
        )

    def generate(self, prompt: str) -> str:
        """
        Generate a response from the LLM.
        """

        response = self.llm.invoke(prompt)

        return response.content


if __name__ == "__main__":

    llm = LLMModel()

    print("=" * 60)
    print(" AI Student Support Chatbot (Groq)")
    print("=" * 60)

    while True:

        question = input("\nYou: ")

        if question.lower() == "exit":
            break

        answer = llm.generate(question)

        print("\nAssistant:")
        print(answer)