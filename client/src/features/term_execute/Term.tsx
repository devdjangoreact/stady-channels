import React, { useState, useEffect } from "react";
import axios from "axios";
import Connection from "./Connection";

interface Action {
  local: string;
  comand: string;
  exacute: string;
}

const Autocomplete = () => {
  const [completions, setCompletions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [execute, setexecute] = useState(true);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [location_dir, setLocation_dir] = useState("");
  const [input, setInput] = useState<string>("location_dir");
  const [inputnow, setInputnow] = useState<string>("");
  const [outputs, setOutputs] = useState<Action[]>();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (completions.length > 0) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const getCompletions = async (command_prefix: string) => {
    try {
      const response = await axios.post(`/auto-complete/`, {
        command: command_prefix,
      });

      setCompletions(response.data.completions);
    } catch (error) {
      // this.state.term.write(`Error: ${error}\r\n`);
    }
  };

  const executeCommand = async () => {
    if (input !== "") {
      try {
        const response = await axios.post("/execute-command/", {
          command: input,
        });

        setLocation_dir(response.data.location_dir);
        if (response.data.output !== "") {
          let res = response.data.output.split("\n");
          for (let key in res) {
            res[key] = res[key] + "  ";
          }

          outputs.push({
            local: location_dir,
            comand: input,
            exacute: res,
          });
        }
      } catch (error) {
        outputs.push({
          local: location_dir,
          comand: input,
          exacute: "Error: ${error}\r\n",
        });
      }
    }
  };

  const chenge_dir = (param: string) => {
    const arr = input.split(" ");

    if (arr[0] === "cd") {
      const path = arr[1].split("/");
      const chenge = path[path.length - 1] === "";
      console.log(path);
      if (chenge && path.length === 1) {
        console.log(param);
        setInput(arr[0] + " " + param + "/");
      } else if (arr.length > 1 && chenge) {
        console.log(1);
        setInput(input + param + "/");
      } else {
        console.log(2);
        console.log(path[path.length - 1]);
        setInput(input.replace(path[path.length - 1], param + "/"));
      }
    } else {
      setInput(param);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      getCompletions(input);
      setexecute(false);
      if (completions.length > 0) {
        setShowDropdown(true);
      } else {
        setShowDropdown(false);
      }
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      if (highlightedIndex === completions.length - 1) {
        setHighlightedIndex(0);
      } else {
        setHighlightedIndex(highlightedIndex + 1);
      }
      setexecute(false);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (highlightedIndex === 0) {
        setHighlightedIndex(completions.length - 1);
      } else {
        setHighlightedIndex(highlightedIndex - 1);
      }
      setexecute(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setInputnow(input);
      if (historyIndex === 0) {
        setHistoryIndex(outputs.length - 1);
      } else {
        setHistoryIndex(historyIndex - 1);
      }
      console.log(input, inputnow, historyIndex);
    } else if (e.key === "ArrowUp") {
      setInputnow(input);
      e.preventDefault();
      if (historyIndex === outputs.length - 1) {
        setHistoryIndex(0);
      } else {
        setHistoryIndex(historyIndex + 1);
      }
    } else if (e.key === "Enter" && !execute) {
      e.preventDefault();
      chenge_dir(completions[highlightedIndex]);
      setShowDropdown(false);
      setexecute(true);
      setCompletions([]);
    } else if (e.key === "Enter" && execute) {
      executeCommand();
      setShowDropdown(false);
      setCompletions([]);
      setInput("");
      e.preventDefault();
    }
  };

  const Clear = () => {
    setOutputs([]);
    setInput("");
  };

  useEffect(() => {
    if (location_dir === "") {
      executeCommand();
      Clear();
    } else {
      setOutputs(outputs);
    }
    const handleClickOutside = (event: any) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowDropdown(false);
        if (event.target.outerHTML.includes("suggestion")) {
          chenge_dir(event.target.innerText);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef, location_dir, input]);

  return (
    <div className="flex w-full h-full">
      <Connection />
      <div className="h-full w-full rounded-md p-2 text-xs font-mono bg-black text-white">
        <div>
          <button
            className="px-1 my-1 w-16 rounded-lg bg-orange-100 hover:bg-orange-200 text-black"
            onClick={Clear}
          >
            clear
          </button>
          {outputs &&
            outputs.map((output, index) => (
              <>
                <div key={index}>
                  <span key={index + "local"} className="text-red-500">
                    {output.local}
                  </span>
                  <span key={index + "comand"}>{output.comand}</span>
                </div>
                <span className=" text-sm">{output.exacute}</span>
              </>
            ))}
        </div>
        <div className="flex w-full">
          <div className="text-red-500 pr-1">{location_dir} </div>
          <div className="w-full">
            <input
              ref={inputRef}
              className="p-0 w-full text-sm bg-black border-none text-white outline-none"
              type="text"
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
            />

            {showDropdown && (
              <div className="flex w-full">
                <div>
                  <span className={` bg-black text-black`}>{input}</span>
                </div>
                <ul className={` w-48 p-1 rounded-lg border border-red-500 `}>
                  {completions &&
                    completions.map((suggestion, index) => (
                      <li
                        key={index}
                        prefix={"suggestion"}
                        className={
                          index === highlightedIndex
                            ? "bg-gray-600 hover:bg-orange-200 hover:text-red-600"
                            : "hover:bg-gray-600 "
                        }
                      >
                        {suggestion}
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Autocomplete;
