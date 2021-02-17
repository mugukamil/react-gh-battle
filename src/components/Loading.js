import { useEffect, useRef, useState } from "react";

export default function Loading(props) {
  const [text, setText] = useState(props.text);
  const prevText = useRef();
  useEffect(() => {
    const stopper = `${props.text}...`;
    prevText.current = text;
    const interval = setInterval(() => {
      if (text === stopper) {
        setText(props.text);
      } else {
        setText(`${prevText.current}.`);
      }
    }, 300);
    return () => {
      clearInterval(interval);
    };
  }, [props.text, text]);
  return <div>{text}</div>;
}

Loading.defaultProps = {
  text: "Loading",
};
