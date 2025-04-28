import { useState } from "react";
import Keyboard from "./components/Keyboard";
import DesignBar from "./components/DesignBar";
import TextDisplay from "./components/TextDisplay";
import "./App.css";

function App() {
  const [text, setText] = useState([]);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [allTextSelected, setAllTextSelected] = useState(false);
  const [language, setLanguage] = useState(true);
  const [currentTextStyle, setCurrentTextStyle] = useState({
    fontSize: 20,
    fontFamily: "Arial",
    color: "rgb(0 0 0)",
    fontWeight: "normal",
  });

  const handleAddToText = (newChar) => {
    setText((text) => [
      ...text,
      { char: newChar, style: { ...currentTextStyle } },
    ]);
    setUndoStack((undoStack) => [
      ...undoStack,
      { char: newChar, style: { ...currentTextStyle }, operationType: "add" },
    ]);
  };

  const handleUndo = () => {
    if (!undoStack.length) return;

    const lastChar = undoStack[undoStack.length - 1];
    setUndoStack((undoStack) => undoStack.slice(0, -1));
    setRedoStack((redoStack) => [...redoStack, lastChar]);

    setText((text) =>
      lastChar.operationType === "add" ? text.slice(0, -1) : [...text, lastChar]
    );
  };

  const handleRedo = () => {
    if (!redoStack.length) return;
    const lastChar = redoStack[redoStack.length - 1];

    setRedoStack((redoStack) => redoStack.slice(0, -1));
    setUndoStack((undoStack) => [...undoStack, lastChar]);

    setText((text) =>
      lastChar.operationType === "sub" ? text.slice(0, -1) : [...text, lastChar]
    );
  };
  
  const handleFontSize = (increase) => {
    const updateSize = (size) => Math.max(8, size + (increase ? 2 : -2));

    allTextSelected
      ? setText((text) =>
          text.map((item) => ({
            ...item,
            style: { ...item.style, fontSize: updateSize(item.style.fontSize) },
          }))
        )
      : setCurrentTextStyle((currentTextStyle) => ({
          ...currentTextStyle,
          fontSize: updateSize(currentTextStyle.fontSize),
        }));
  };

  const handleFontFamily = (font) => {
    allTextSelected
      ? setText((text) =>
          text.map((item) => ({
            ...item,
            style: { ...item.style, fontFamily: font },
          }))
        )
      : setCurrentTextStyle((currentTextStyle) => ({
          ...currentTextStyle,
          fontFamily: font,
        }));
  };

  const handleColor = (color) => {
    allTextSelected
      ? setText((text) =>
          text.map((item) => ({
            ...item,
            style: { ...item.style, color: color },
          }))
        )
      : setCurrentTextStyle((currentTextStyle) => ({
          ...currentTextStyle,
          color: color,
        }));
  };

  const handleClearAll = () => {
    setText([]);
  };

  const handleCase = (toUpper) => {
    setText((text) =>
      text.map((item) => ({
        ...item,
        char: toUpper ? item.char.toUpperCase() : item.char.toLowerCase(),
      }))
    );
  };

  const handleBold = () => {
    setCurrentTextStyle((currentTextStyle) => ({
      ...currentTextStyle,
      fontWeight: currentTextStyle.fontWeight == "bold" ? "normal" : "bold",
    }));
  };

  const handleAllTextSelected = () => {
    setAllTextSelected((allTextSelected) => !allTextSelected);
  };

  const handleLanguageChange = () => {
    setLanguage((language) => !language);
  };

  return (
    <div className="app">
      <TextDisplay text={text} />
      <DesignBar
        handleFontSize={handleFontSize}
        handleFontFamily={handleFontFamily}
        handleColor={handleColor}
        handleClearAll={handleClearAll}
        handleUndo={handleUndo}
        handleCase={handleCase}
        handleLanguageChange={handleLanguageChange}
        handleBold={handleBold}
        handleRedo={handleRedo}
        handleAddToText={handleAddToText}
        handleAllTextSelected={handleAllTextSelected}
        keyboardState={{
          all: allTextSelected,
          bold: currentTextStyle.fontWeight,
        }}
      />
      <Keyboard
        handleAddToText={handleAddToText}
        setText={setText}
        setUndoStack={setUndoStack}
        text={text}
        language={language}
      />
    </div>
  );
}

export default App;
