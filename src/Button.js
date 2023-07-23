import "./Button.css";

const Button = ({ id, value, onClick }) => {
    return (
      <button id={id} onClick={onClick}>
        {value}
      </button>
    );
  };
  
export default Button;