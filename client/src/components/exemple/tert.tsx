import React, { useRef } from "react";
// import { Terminal } from "xterm";
import "xterm/css/xterm.css";
import axios from "axios";

interface Props {}
interface State {
  term: any;
  command: string;
}

class TerminalEmulator extends React.Component<Props, State> {
  private terminalRef = React.createRef<HTMLDivElement>();

  constructor(props: Props) {
    super(props);
    this.state = {
      term: null,
      command: "",
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

  handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      this.executeCommand();
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
          />
          <button onClick={this.executeCommand}>Execute</button>
        </div>
      </div>
    );
  }
}

export default TerminalEmulator;
