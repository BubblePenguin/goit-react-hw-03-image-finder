import PropTypes from 'prop-types';

const Button = ({ text, onClick, visible = true }) => {
  return (
    <button type="button" onClick={onClick} hidden={!visible}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  visible: PropTypes.bool,
};

export default Button;
