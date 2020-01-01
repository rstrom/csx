import React, { useState } from "react";
import { Button, Stack, Header, Code } from "./components";

const App: React.FC = () => {
  const [showCommand, setShowCommand] = useState(false);
  return (
    <Stack justify_center>
      <Stack flex_col max_w_sm>
        <Header text_center>csx 🔥</Header>
        <Button
          self_end
          bg_blue_600
          hover_bg_green_200
          onClick={() => setShowCommand(true)}
        >
          I want clean dx
        </Button>
        <Code mt_4 hidden={!showCommand}>
          yarn add @csx/core @csx/build
        </Code>
      </Stack>
    </Stack>
  );
};

export default App;
