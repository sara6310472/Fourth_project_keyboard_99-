import PropTypes from "prop-types";
import "./Key.css";

function Key(props) {
  const { char, symbol, onClick, className = "" } = props;

  return (
    <button
      className={`key ${className}`}
      onClick={() => onClick(char || symbol)}
    >
      {char ? (
        <>
          <span className="mainChar">{char.hebrew}</span>
          <span className="subChar">{char.english}</span>
        </>
      ) : (
        <span>{symbol}</span>
      )}
    </button>
  );
}

Key.propTypes = {
  char: PropTypes.shape({
    hebrew: PropTypes.string,
    english: PropTypes.string,
  }),
  symbol: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Key.defaultProps = {
  className: "",
  char: null,
  symbol: null,
};

export default Key;
