import React, { useState } from "react";
import { Button, Stack, Header, Code, Card } from "./components";

const Pyramid: React.FC<{ count: number }> = props => {
  return Array.from(new Array(props.count)).reduce(
    (children: React.ReactNode) => <Card flex_grow_0>{children}</Card>,
    <>{props.children}</>
  );
};

const App: React.FC = () => {
  const [count, setCount] = useState(0);
  return (
    <Stack justify_center items_center p_16 h_screen bg_green_100>
      <Pyramid count={count}>
        <Stack flex_col max_w_sm>
          <Header text_center>csx 🔥</Header>
          <Button
            self_end
            hover_bg_green_200
            onClick={() => setCount(count + 1)}
          >
            I want clean dx
          </Button>
          <Code mt_16 mb_16 hidden={count < 1}>
            npm i @csx/core @csx/build
          </Code>
        </Stack>
      </Pyramid>
    </Stack>
  );
};

export default App;
