import { Component } from "react";
import axios from "axios";

interface Props {}
interface State {
  command: string;
  answer: string;
  start: boolean;
}

class Pyxtermjs extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      command: "",
      start: true,
      answer: "",
    };
  }

  start = async () => {
    try {
      const response = await axios.post("/pyxtermjs/", {
        command: "start",
      });

      this.setState({ answer: response.data.command });
      this.setState({ start: true });
    } catch (error) {
      this.setState({ answer: `Error: ${error}\r\n` });
    }
  };

  stop = async () => {
    try {
      const response = await axios.post("/pyxtermjs/", {
        command: "stop",
      });

      this.setState({ answer: response.data.command });
      this.setState({ start: false });
    } catch (error) {
      this.setState({ answer: `Error: ${error}\r\n` });
    }
  };

  render() {
    return (
      <iframe
        src="http://192.168.17.130:8000/term/"
        className="h-full w-full m-2"
      />
    );
  }
}

export default Pyxtermjs;
