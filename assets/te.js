import fs from "fs";
import OpenAI from "openai";

process.env['OPENAI_API_KEY'] = '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';

const openai = new OpenAI();


const test= fs.readFileSync("Hello.mp3");

console.log(test);

//const transcription = await openai.audio.transcriptions.create({
//    file: fs.createReadStream("Hello.mp3"),
//    model: "whisper-1",
//  });

//console.log(transcription.text);



