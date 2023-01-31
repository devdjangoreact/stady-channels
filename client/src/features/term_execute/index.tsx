import React, { useRef } from "react";
// import { Terminal } from "xterm";
import "xterm/css/xterm.css";
import axios from "axios";

interface Props {}
interface State {
  term: any;
  command: string;
  commandHistory: string[];
  currentCommandIndex: number;
  completions: string[] | [];
}

class Term_execute extends React.Component<Props, State> {
  private terminalRef = React.createRef<HTMLDivElement>();

  constructor(props: Props) {
    super(props);
    this.state = {
      term: null,
      command: "",
      commandHistory: [],
      currentCommandIndex: -1,
      completions: [],
    };
  }

  componentDidMount() {
    // const term = new Terminal();
    // term.open(this.terminalRef.current as HTMLElement);
    // term.write("Welcome to the terminal!\r\n");
    // this.setState({ term });
  }

  executeCommand = async () => {
    try {
      const response = await axios.post("/execute-command/", {
        command: this.state.command,
      });
      this.state.term.write(response.data.output);
      this.setState({ command: "" });
    } catch (error) {
      this.state.term.write(`Error: ${error}\r\n`);
    }
  };

  getCompletions = async (command_prefix: string) => {
    try {
      const response = await axios.get(`/auto-complete/${command_prefix}/`);
      this.setState({ completions: response.data.completions as [] });
    } catch (error) {
      this.state.term.write(`Error: ${error}\r\n`);
    }
  };

  handleKeyDown = async (e: any) => {
    if (e.key === "Enter") {
      await this.executeCommand();
      // } else if (e.key === "ArrowUp") {
      //   if (this.state.currentCommandIndex > 0) {
      //     this.setState({
      //       command: this.state.commandHistory[--this.state.currentCommandIndex],
      //       completions: [],
      //     });
      //   }
      // } else if (e.key === "ArrowDown") {
      //   if (
      //     this.state.currentCommandIndex <
      //     this.state.commandHistory.length - 1
      //   ) {
      //     this.setState({
      //       command: this.state.commandHistory[++this.state.currentCommandIndex],
      //       completions: [],
      //     });
      //   } else {
      //     this.setState({
      //       command: "",
      //       currentCommandIndex: this.state.commandHistory.length,
      //       completions: [],
      //     });
      //   }
    } else if (e.key === "Tab") {
      const completions = await this.getCompletions(this.state.command);
      // this.setState({ completions });
    }
  };

  handleCommandChange = (e: any) => {
    this.setState({ command: e.target.value });
  };

  render() {
    return (
      <div>
        <p ref={this.terminalRef} onKeyDown={this.handleKeyDown} />
        <div>
          <input
            type="text"
            value={this.state.command}
            onChange={this.handleCommandChange}
            placeholder="Enter command here"
            onKeyDown={this.handleKeyDown}
          />
          <button onClick={this.executeCommand}>Execute</button>
        </div>
        {this.state.completions.length > 0 && (
          <div>
            <ul>
              {this.state.completions.map((completion) => (
                <li key={completion}>{completion}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default Term_execute;
