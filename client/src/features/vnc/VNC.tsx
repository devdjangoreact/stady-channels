import React, { useState, useRef } from "react";
import axios from "axios";

interface ScreenshotProps {}

const Screenshot: React.FC<ScreenshotProps> = () => {
  const [coordinates, setCoordinates] = useState({
    x: 0,
    y: 0,
    doubleClick: false,
  });

  const [size, setSize] = useState({ width: 0, height: 0 });

  const photoRef = useRef<HTMLImageElement>(null);
  const [screenshot, setScreenshot] = useState<string | null>(
    "scs/media/screenshot.png"
  );

  const sendCoordinates = async () => {
    console.log(coordinates);
    try {
      const response = await axios.post("/coordinates/", coordinates);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDoubleClick = (event: React.MouseEvent<HTMLImageElement>) => {
    if (!photoRef.current) return;
    const rect = photoRef.current.getBoundingClientRect();
    setCoordinates({
      x:
        ((event.clientX - rect.x) * photoRef.current.naturalWidth) /
        photoRef.current.clientWidth,
      y:
        ((event.clientY - rect.y) * photoRef.current.naturalHeight) /
        photoRef.current.clientHeight,
      doubleClick: true,
    });
    sendCoordinates();
  };

  const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
    if (!photoRef.current) return;
    const rect = photoRef.current.getBoundingClientRect();
    setCoordinates({
      x: Math.ceil(
        ((event.clientX - rect.x) * photoRef.current.naturalWidth) /
          photoRef.current.clientWidth
      ),
      y: Math.ceil(
        ((event.clientY - rect.y) * photoRef.current.naturalHeight) /
          photoRef.current.clientHeight
      ),
      doubleClick: false,
    });
    sendCoordinates();
  };

  // useEffect(() => {
  //   axios
  //     .get("/screenshot/")
  //     .then((response) => {
  //       setScreenshot(response.data.screenshot);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <>
      <div className="flex w-full h-full bg-gray-300">
        <div className="max-w-[200px] min-w-[180px]">
          <p>
            ({coordinates.x}, {coordinates.y}) <br />
            List client connection:
          </p>
        </div>
        {screenshot && (
          <div>
            <img
              className="w-full h-full object-fill"
              ref={photoRef}
              src={screenshot}
              alt="Screenshot"
              onDoubleClick={handleDoubleClick}
              onClick={handleClick}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Screenshot;
