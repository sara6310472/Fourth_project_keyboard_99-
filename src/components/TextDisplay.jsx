import PropTypes from "prop-types";
import "./TextDisplay.css";

function TextDisplay({ text }) {
  return (
    <div className="textDisplay">
      {text.map((item, index) =>
        item.char === "\n" ? (
          <br key={index} />
        ) : (
          <span key={index} style={item.style}>
            {item.char}
          </span>
        )
      )}
    </div>
  );
}

TextDisplay.propTypes = {
  text: PropTypes.arrayOf(
    PropTypes.shape({
      char: PropTypes.string.isRequired,
      style: PropTypes.object.isRequired,
    })
  ).isRequired,
};

export default TextDisplay;
