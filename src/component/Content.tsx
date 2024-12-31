import { Pagination, Spin } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "../css/Content.css";
import Modal from "./Modal";

export default function Content() {
  // Word interface
  interface Word {
    word: string;
    meaning: string;
    furigana: string;
    romaji: string;
    level: number;
  }

  // Redux state
  const alpha = useSelector((state: RootState) => state.options.alpha);
  const level = useSelector((state: RootState) => state.options.level);

  // Local state to track words and pagination
  const [allWords, setAllWords] = useState<Word[]>([]);
  const [showingWords, setShowingWords] = useState<Word[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [isDataReady, setIsDataReady] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Modal
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalWord, setModalWord] = useState<Word | null>(null);

  const openModal = useCallback((word: Word) => {
    console.log("Modal open for: " + word.word);

    setModalWord(word);
    setIsModalVisible(true);
  }, []);

  const closeModal = () => {
    setModalWord(null);
    setIsModalVisible(false);
  };

  // Filter words that start with the given alpha (furigana)
  const getWordsStartWith = (words: Word[], alpha: string) => {
    return words.filter((word) => word.furigana.startsWith(alpha));
  };

  // Fetch words from API based on level and alpha
  const fetchWords = async (level: number) => {
    try {
      setLoaded(false);
      const response = await axios.get(
        `https://jlpt-vocab-api.vercel.app/api/words/all?level=${level}`
      );
      setAllWords(response.data);
      setLoaded(true);
    } catch (error) {
      console.error("Error fetching words:", error);
    }
  };

  // Update showingWords based on allWords and alpha
  useEffect(() => {
    if (alpha && level) {
      setIsDataReady(true);
    }
  }, [alpha, level]);

  useEffect(() => {
    if (isDataReady) {
      fetchWords(level);
    }
  }, [isDataReady, level]);

  // Update showingWords whenever allWords or alpha changes
  useEffect(() => {
    if (allWords.length > 0) {
      setShowingWords(getWordsStartWith(allWords, alpha));
    }
  }, [allWords, alpha]);

  // Handle pagination changes
  const handlePaginationChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  // Render individual word items
  const gridItem = (w: Word) => {
    if (!w) {
      return <div key="not found">Item not found</div>; // In case w is undefined or invalid, return a fallback UI
    }
    return (
      <div
        className="grid-item"
        key={w.word}
        onClick={() => {
          openModal(w);
        }}
      >
        <p className="text-blue-500">{w.furigana}</p>
        <p className="text-black">{w.meaning}</p>
        <p className="text-3xl font-semibold">{w.word}</p>
      </div>
    );
  };

  // Content to be displayed based on the current page
  const contentElements = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const middleIndex = (currentPage - 1) * pageSize + 4;
    const endIndex = startIndex + pageSize;

    const firstPart = showingWords
      .slice(startIndex, middleIndex)
      .map((word) => gridItem(word));

    const middlePart = (
      <div className="grid-main-item" key="grid-main-item">
        {alpha}
      </div>
    );

    const lastPart = showingWords
      .slice(middleIndex, endIndex)
      .map((word) => gridItem(word));

    return [...firstPart, middlePart, ...lastPart];
  };

  if (loaded) {
    return (
      <>
      <div className="relative w-screen h-[92vh] flex items-center justify-center">
        <Modal
          isVisible={isModalVisible}
          word={modalWord}
          onClose={closeModal}
        />
        <div className="w-[90%] h-[85vh] flex flex-col items-center space-y-4">
          <div className="flex-1 w-full grid grid-cols-3 grid-rows-4 gap-2 items-center justify-center">
            {contentElements()}
          </div>
          <Pagination
            simple
            defaultCurrent={1}
            current={currentPage}
            total={showingWords.length}
            showSizeChanger={false}
            onChange={handlePaginationChange}
          />
        </div>
      </div>
      </>
    );
  } else {
    return (
      <div className="w-screen h-screen bg-white flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }
}
