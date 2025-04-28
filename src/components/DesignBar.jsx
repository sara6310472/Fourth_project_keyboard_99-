import PropTypes from "prop-types";
import Key from "./Key";
import "./DesignBar.css";

function DesignBar(props) {
  const {
    handleFontSize,
    handleFontFamily,
    handleColor,
    handleClearAll,
    handleUndo,
    handleCase,
    handleLanguageChange,
    handleBold,
    handleRedo,
    handleAddToText,
    handleAllTextSelected,
    keyboardState,
  } = props;

  const fonts = ["Arial", "Times New Roman", "David", "Miriam"];
  const emojis = ["😄", "🤣", "😃", "😂", "😁", "😀", "😅", "😆"];
  
  const toolButtons = [
    { symbol: "עבר/ENG", onClick: handleLanguageChange, className: "langKey" },
    { symbol: "A+", onClick: () => handleFontSize(true), className: "toolBtn" },
    {
      symbol: "A-",
      onClick: () => handleFontSize(false),
      className: "toolBtn",
    },
    {
      symbol: "Bold",
      onClick: handleBold,
      className: `toolBtn ${keyboardState.bold === "bold" ? "blue" : ""}`,
    },
    { symbol: "ABC", onClick: () => handleCase(true), className: "toolBtn" },
    { symbol: "abc", onClick: () => handleCase(false), className: "toolBtn" },
    { symbol: "↩", onClick: handleRedo, className: "toolBtn" },
    { symbol: "↪", onClick: handleUndo, className: "toolBtn" },
    { symbol: "Clear All", onClick: handleClearAll, className: "toolBtn" },
    {
      symbol: "All",
      onClick: handleAllTextSelected,
      className: `toolBtn ${keyboardState.all ? "blue" : ""}`,
    },
  ];

  return (
    <div className="toolbar">
      <select
        className="fontSelect"
        onChange={(e) => handleFontFamily(e.target.value)}
      >
        {fonts.map((font) => (
          <option key={font} value={font}>
            {font}
          </option>
        ))}
      </select>
      {toolButtons.map(({ symbol, onClick, className }) => (
        <Key
          key={symbol}
          symbol={symbol}
          onClick={onClick}
          className={className}
        />
      ))}
      <input
        type="color"
        className="colorPicker"
        onChange={(e) => handleColor(e.target.value)}
      />
      <select
        className="emojiPicker"
        onChange={(e) => handleAddToText(e.target.value)}
      >
        {emojis.map((emoji) => (
          <option key={emoji} value={emoji}>
            {emoji}
          </option>
        ))}
      </select>
    </div>
  );
}

DesignBar.propTypes = {
  handleFontSize: PropTypes.func.isRequired,
  handleFontFamily: PropTypes.func.isRequired,
  handleColor: PropTypes.func.isRequired,
  handleClearAll: PropTypes.func.isRequired,
  handleUndo: PropTypes.func.isRequired,
  handleCase: PropTypes.func.isRequired,
  handleLanguageChange: PropTypes.func.isRequired,
  handleBold: PropTypes.func.isRequired,
  handleRedo: PropTypes.func.isRequired,
  handleAddToText: PropTypes.func.isRequired,
  handleAllTextSelected: PropTypes.func.isRequired,
  keyboardState: PropTypes.shape({
    all: PropTypes.bool.isRequired,
    bold: PropTypes.string.isRequired,
  }).isRequired,
};

export default DesignBar;
