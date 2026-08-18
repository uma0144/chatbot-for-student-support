import { useCallback, useEffect, useRef, useState } from "react";

function getSpeechRecognition() {
  if (typeof window === "undefined") return null;
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

/** Browsers only allow mic access on HTTPS or localhost — not on http://192.168.x.x */
export function isVoiceInputAvailable() {
  if (typeof window === "undefined") return false;
  return Boolean(getSpeechRecognition()) && window.isSecureContext;
}

function friendlySpeechError(code) {
  switch (code) {
    case "not-allowed":
      return "Microphone blocked. Use https:// or open http://localhost:5173 on your PC, then allow mic in the browser.";
    case "service-not-allowed":
      return "Voice input is not allowed on this connection. Use localhost on PC or HTTPS.";
    case "no-speech":
      return "No speech detected. Try again and speak clearly.";
    case "network":
      return "Voice service needs internet. Check your connection.";
    case "aborted":
      return "";
    default:
      return code ? `Voice error: ${code}` : "Speech recognition failed.";
  }
}

export function useSpeechToText({ language = "en-IN" } = {}) {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    setSupported(isVoiceInputAvailable());
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
        const message = friendlySpeechError(event.error);
        if (message) onError?.(new Error(message));
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
