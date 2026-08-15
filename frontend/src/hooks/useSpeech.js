import { useCallback, useEffect, useRef, useState } from "react";

function getSpeechRecognition() {
  if (typeof window === "undefined") return null;
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

export function useSpeechToText({ language = "en-IN" } = {}) {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    setSupported(Boolean(getSpeechRecognition()));
  }, []);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
    setListening(false);
  }, []);

  const start = useCallback(
    (onResult, onError) => {
      const SpeechRecognition = getSpeechRecognition();
      if (!SpeechRecognition) {
        onError?.(new Error("Speech recognition is not supported in this browser."));
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = language;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        const transcript = event.results[0]?.[0]?.transcript?.trim();
        if (transcript) onResult?.(transcript);
      };

      recognition.onerror = (event) => {
        setListening(false);
        onError?.(new Error(event.error || "Speech recognition failed."));
      };

      recognition.onend = () => setListening(false);

      recognitionRef.current = recognition;
      setListening(true);
      recognition.start();
    },
    [language]
  );

  const toggle = useCallback(
    (onResult, onError) => {
      if (listening) {
        stop();
      } else {
        start(onResult, onError);
      }
    },
    [listening, start, stop]
  );

  return { supported, listening, toggle, stop };
}

export function speakText(text, { language = "en-IN" } = {}) {
  if (!text?.trim() || typeof window === "undefined" || !window.speechSynthesis) {
    return false;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text.replace(/[#*_`>]/g, "").slice(0, 2000));
  utterance.lang = language;
  utterance.rate = 1;
  window.speechSynthesis.speak(utterance);
  return true;
}

export function stopSpeaking() {
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}
