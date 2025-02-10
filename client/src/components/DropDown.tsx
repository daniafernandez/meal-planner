import { useState } from "react";

interface Props {
    label: string;
    type?: 'primary' | 'secondary' | 'danger' | 'success' | 'close' | 'link' | 'light';
    options: string[];
    defaultOption: string;
    onOptionSelect: (selectedOption: string) => void; 
  }
  
  
  export const DropDown = ({ label, type = 'primary', options, defaultOption, onOptionSelect}: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentOption, setCurrentOption] = useState(defaultOption);

    const chooseOption = (option: string) => {
        setCurrentOption(option);
        onOptionSelect(option);
        setIsOpen(!isOpen);
    };

    return (
        <>
        {label}
        <div className="dropdown">
            <button
                className={`btn btn-${type} dropdown-toggle`}
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                {currentOption}
            </button>
            <div className={`dropdown-menu ${isOpen ? "show" : ""}`} aria-labelledby="dropdownMenuLink">
                {options.map((option, index) => (
                    <li key={index}>
                        <button
                        className="dropdown-item"
                        type="button"
                        onClick={() => chooseOption(option)}
                        >
                        {option}
                        </button>
                    </li>
                ))}
            </div>
      </div>
      </>
    );
  };
  
  export default DropDown;