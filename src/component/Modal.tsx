import { CloseOutlined } from "@ant-design/icons";
import "../css/Modal.css";
import { generateResponse, handleResponse } from "../utils/chatbot";
import { useEffect, useState } from "react";

// Word interface
interface Word {
  word: string;
  meaning: string;
  furigana: string;
  romaji: string;
  level: number;
}

interface ModalProps {
  word: Word | null; // Accept a Word object or null
  isVisible: boolean;
  onClose: () => void;
}

interface Example {
  jp: string;
  vi: string;
}

interface DetailWord {
  word: string;
  reading: string;
  meaning: string;
  synonyms: Array<string>;
  antonyms: Array<string>;
  examples: Example[];
}

export default function Modal({ word, isVisible, onClose }: ModalProps) {
  const [detailWord, setDetailWord] = useState<DetailWord | null>(null);
  
  useEffect(() => {
    if (word?.word){
        handleGetDetailWord(word.word);
    }
  }, [word?.word]);

  if (!isVisible || !word) return null;

  const handleGetDetailWord = async (word: string) => {
    try {
      const response = await generateResponse(word);
      setDetailWord(handleResponse(response));
    } catch (error) {
      console.error("Error in handleGetDetailWord:", error);
    }
  };

  const exampleElements = (example: Example[]): JSX.Element[] => {
    const returnElement: JSX.Element[] = [];
    example.forEach((e: Example) => {
      returnElement.push(
        <div className="flex flex-col space-x-1">
          <p className="text-red-500">{e.jp}</p>
          <p className="">{e.vi}</p>
        </div>
      );
    });
    return returnElement;
  };

  if (!detailWord) return null;

  return (
    <>
      <div className={isVisible ? "modal-open" : "modal-close"}>
        <div className="bg-white rounded-md flex flex-col items-center p-6 space-y-5 w-full md:w-[80%] h-screen md:h-fit">
          <div className="flex w-full justify-end">
            <CloseOutlined
              onClick={onClose}
              className="hover:scale-105 hover:rotate-90 hover:text-red-500 animate-ease"
            />
          </div>
          <p className="text-5xl font-semibold text-blue-500">
            {detailWord.word}
          </p>
          <p className="text-2xl">[ {detailWord.reading} ]</p>
          <p className="text-2xl">{detailWord.meaning}</p>
          <p className="text-3xl font-semibold text-blue-500">Ví dụ</p>
          {exampleElements(detailWord.examples)}
          <p className="text-3xl font-semibold text-blue-500">Từ đồng nghĩa</p>
          <p className="">{detailWord.synonyms}</p>
          <p className="text-3xl font-semibold text-blue-500">Từ trái nghĩa</p>
          <p className="">{detailWord.antonyms}</p>
        </div>
      </div>
    </>
  );
}
