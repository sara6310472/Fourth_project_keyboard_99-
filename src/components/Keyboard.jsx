import { useState } from "react";
import PropTypes from "prop-types";
import Key from "./Key.jsx";
import "./Keyboard.css";

function Keyboard(props) {
  const {
    handleAddToText,
    setText,
    setUndoStack,
    text,
    language,
  } = props;

  const [capsLock, setCapsLock] = useState(false);

  const handleCapsLock = () => {
    setCapsLock((capsLock) => !capsLock);
  };

  const handleBackspace = () => {
    if (!text.length) return;

    const lastChar = text[text.length - 1];
    setText((text) => text.slice(0, -1));
    setUndoStack((undoStack) => [
      ...undoStack,
      { ...lastChar, operationType: "sub" },
    ]);
  };

  const handleKeyClick = (char) => {
    const value = capsLock
      ? char.english.toUpperCase()
      : language
      ? char.hebrew
      : char.english.toLowerCase();
    handleAddToText(value);
  };

  const handleEnter = () => {
    handleAddToText("\n");
  };

  const handleSpace = () => {
    handleAddToText("\u00A0");
  };

  const row1 = [
    { hebrew: "1", english: "!" },
    { hebrew: "2", english: "@" },
    { hebrew: "3", english: "#" },
    { hebrew: "4", english: "$" },
    { hebrew: "5", english: "%" },
    { hebrew: "6", english: "^" },
    { hebrew: "7", english: "&" },
    { hebrew: "8", english: "*" },
    { hebrew: "9", english: "(" },
    { hebrew: "0", english: ")" },
  ];
  const row2 = [
    { hebrew: "/", english: "Q" },
    { hebrew: "'", english: "W" },
    { hebrew: "ק", english: "E" },
    { hebrew: "ר", english: "R" },
    { hebrew: "א", english: "T" },
    { hebrew: "ט", english: "Y" },
    { hebrew: "ו", english: "U" },
    { hebrew: "ן", english: "I" },
    { hebrew: "ם", english: "O" },
    { hebrew: "פ", english: "P" },
  ];
  const row3 = [
    { hebrew: "ש", english: "A" },
    { hebrew: "ד", english: "S" },
    { hebrew: "ג", english: "D" },
    { hebrew: "כ", english: "F" },
    { hebrew: "ע", english: "G" },
    { hebrew: "י", english: "H" },
    { hebrew: "ח", english: "J" },
    { hebrew: "ל", english: "K" },
    { hebrew: "ך", english: "L" },
    { hebrew: "ף", english: ";" },
  ];
  const row4 = [
    { hebrew: "ז", english: "Z" },
    { hebrew: "ס", english: "X" },
    { hebrew: "ב", english: "C" },
    { hebrew: "ה", english: "V" },
    { hebrew: "נ", english: "B" },
    { hebrew: "מ", english: "N" },
    { hebrew: "צ", english: "M" },
    { hebrew: "ת", english: "," },
    { hebrew: "ץ", english: "." },
  ];
  const rows = [
    [
      ...row1,
      { symbol: "⌫", className: "specialKey", onClick: handleBackspace },
    ],
    row2,
    [
      {
        symbol: "Caps Lock",
        className: `${capsLock ? "blue" : ""}`,
        onClick: handleCapsLock,
      },
      ...row3,
      { symbol: "Enter", className: "enterKey", onClick: handleEnter },
    ],
    row4,
    [{ symbol: "Space", className: "spaceKey", onClick: handleSpace }],
  ];

  return (
    <div className="keyboard">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((item, i) =>
            item.symbol ? (
              <Key key={i} {...item} />
            ) : (
              <Key key={i} char={item} onClick={handleKeyClick} />
            )
          )}
        </div>
      ))}
    </div>
  );
}

Keyboard.propTypes = {
  handleAddToText: PropTypes.func.isRequired,
  handleSpace: PropTypes.func.isRequired,
  handleEnter: PropTypes.func.isRequired,
  setText: PropTypes.func.isRequired,
  setUndoStack: PropTypes.func.isRequired,
  text: PropTypes.array.isRequired,
  language: PropTypes.bool.isRequired,
};

export default Keyboard;
