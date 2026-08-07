from ai_engine.rag.rag_chain import RAGChain

rag = RAGChain()

while True:
    question = input("Question: ")

    if question.lower() == "exit":
        break

    answer = rag.ask(question)

    print("\nAnswer:")
    print(answer)
    print("-" * 50)