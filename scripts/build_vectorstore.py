"""Build the FAISS vector store from the knowledge base (run from repo root)."""

import os
import sys

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(REPO_ROOT)
sys.path.insert(0, os.path.join(REPO_ROOT, "ai_engine", "rag"))

from loader import DocumentLoader
from splitter import DocumentSplitter
from vectorstore import VectorStoreBuilder

loader = DocumentLoader(data_path="knowledge-base")
docs = loader.load_documents()
splitter = DocumentSplitter()
chunks = splitter.split_documents(docs)
builder = VectorStoreBuilder(save_path="storage/vector_db")
builder.create_vectorstore(chunks)
