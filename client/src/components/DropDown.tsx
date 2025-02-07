import { useState } from "react";

interface Props {
    label: string;
    color?: 'primary' | 'secondary' | 'danger' | 'success'|'close';
    options: string[];
  }
  
  
  export const DropDown = ({ label, color = 'primary', options}: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="dropdown">
            <button
                className={`btn btn-${color} dropdown-toggle`}
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                {label}
            </button>
            <div className={`dropdown-menu ${isOpen ? "show" : ""}`} aria-labelledby="dropdownMenuLink">
                {options.map((option, index) => (
                    <li key={index}>
                        <a className="dropdown-item" href="#">
                        {option}
                        </a>
                    </li>
                ))}
            </div>
      </div>
    );
  };
  
  export default DropDown;