import { useState } from "react";

const useLimitInput = (limit) => {
  const [value, setValue] = useState("");

  const handler = (e) => {
    if(e.target.value.length <= limit) {
      setValue(e.target.value);
    }
    else {
      alert("글자수 제한을 넘었습니다!")
    }
  };

  const reset = () => setValue("")

  return [value, handler, reset];
};

export default useLimitInput;