import { useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

export const useSpeechInput = ({ onTextChange, language = "en-IN", active = false, existingValue = "" }) => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    resetTranscript();
  }, [active]);

  useEffect(() => {
    if (!listening && transcript && active) {
      onTextChange(`${existingValue} ${transcript}`.trim());
    }
  }, [listening, transcript]);

  const start = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true, language });
  };

  const stop = () => {
    SpeechRecognition.stopListening();
  };

  const clear = () => {
    resetTranscript();
    onTextChange("");
  };

  return { transcript, listening, start, stop, clear };
};
