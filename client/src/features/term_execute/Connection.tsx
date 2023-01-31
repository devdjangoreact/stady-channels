import axios from "axios";
import React, { useEffect, useState } from "react";

const Connection = () => {
  const [connect, setconnect] = useState("");
  const [listConnections, setlistConnections] = useState([]);

  const getConnections = async () => {
    try {
      const response = await axios.get(`/connect/`);
      setlistConnections(response.data.connections);
    } catch (error) {
      console.log(`Error: ${error}\r\n`);
    }
  };

  const ConnectVictim = async (connection: string) => {
    try {
      const response = await axios.post(`/connect/`, {
        action: "ConnectVictim",
      });
      setlistConnections(response.data.connections);
    } catch (error) {
      console.log(`Error: ${error}\r\n`);
    }
  };

  const Connect = async () => {
    try {
      const response = await axios.post(`/connect/`, {
        action: connect ? "disconnect" : "connect",
      });

      setconnect(response.data.status);
    } catch (error) {
      console.log(`Error: ${error}\r\n`);
    }
  };

  const handelConnect = (connection: string) => {
    setconnect(connection);
    ConnectVictim(connection);
  };

  useEffect(() => {
    getConnections();
  }, []);

  return (
    <div className="w-2/12 mr-2 p-1 rounded-md bg-orange-50">
      <div>
        <h4>Connections:</h4>
      </div>
      <p>
        status:
        <span
          className={
            connect
              ? `mx-1 px-1 rounded-md bg-green-300`
              : `mx-1 px-1 rounded-md bg-red-300`
          }
        >
          {connect ? "connected" : "disconnected"}
        </span>
      </p>
      <div className="w-full justify-center">
        <button
          className="p-1 rounded-md bg-orange-300 "
          type="submit"
          onClick={Connect}
        >
          {!connect ? "connect" : "disconnect"}
        </button>
      </div>
      <ul className="m-1 p-1 ">
        {listConnections &&
          listConnections.map((connection) => (
            <li
              className="my-1 px-1 justify-center align-middle bg-orange-100 hover:bg-orange-200 rounded-md"
              onClick={(e) => handelConnect(connection)}
            >
              {connection}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Connection;
