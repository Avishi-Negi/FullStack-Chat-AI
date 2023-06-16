import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors());

process.on('uncaughtException', function (err) {
    console.log(err);
  });
  

const configuration = new Configuration({
    organization: "org-qPMhaNVzcrRiuVqftgcb1Qfg",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.post("/", async (request, response) => {
    const { chats } = request.body;

    const result = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: "You are a AvishiGPT. You can help with graphic design tasks",
            },
            ...chats,
        ],
    });

    response.json({
        output: result.data.choices[0].message,
    });
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
