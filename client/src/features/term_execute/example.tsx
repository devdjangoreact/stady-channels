import React, { useState, useEffect } from "react";

interface Suggestion {
  name: string;
}

const suggestions: Suggestion[] = [
  { name: "Apple" },
  { name: "Banana" },
  { name: "Cherry" },
  { name: "Date" },
  { name: "Eggplant" },
];

const Autocomplete: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [chosenSuggestion, setChosenSuggestion] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setShowSuggestions(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (highlightedIndex === suggestions.length - 1) {
        setHighlightedIndex(0);
      } else {
        setHighlightedIndex(highlightedIndex + 1);
      }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (highlightedIndex === 0) {
        setHighlightedIndex(suggestions.length - 1);
      } else {
        setHighlightedIndex(highlightedIndex - 1);
      }
    } else if (event.key === "Enter") {
      setChosenSuggestion(suggestions[highlightedIndex].name);
      setInputValue(suggestions[highlightedIndex].name);
      setShowSuggestions(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      {showSuggestions && (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion.name}
              className={`${index === highlightedIndex ? "bg-gray-200" : ""}`}
              onClick={() => {
                setChosenSuggestion(suggestion.name);
                setInputValue(suggestion.name);
                setShowSuggestions(false);
              }}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
