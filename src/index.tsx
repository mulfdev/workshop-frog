import { serveStatic } from "@hono/node-server/serve-static";
import { Button, Frog, TextInput, parseEther } from "frog";
// import { neynar } from 'frog/hubs'

export const app = new Frog({
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
});

app.use("/*", serveStatic({ root: "./public" }));

app.frame("/", (c) => {
  return c.res({
    image: (
      <div style={{ color: "white", display: "flex", fontSize: 60 }}>
        Perform a transaction
      </div>
    ),
    intents: [
      <Button.Transaction target="/send-ether">Send Eth</Button.Transaction>,
    ],
  });
});

app.transaction("/send-ether", (c) => {
  return c.send({
    chainId: "eip155:84532",
    to: "0x75A6085Bbc25665B6891EA94475E6120897BA90b",
    value: parseEther("0.001"),
  });
});
