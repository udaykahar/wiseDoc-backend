"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadDataToPinecone = void 0;
const pinecone_1 = require("@pinecone-database/pinecone");
const openai_1 = require("langchain/embeddings/openai");
const pinecone_2 = require("langchain/vectorstores/pinecone");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const uploadDataToPinecone = (docs) => __awaiter(void 0, void 0, void 0, function* () {
    const embeddings = new openai_1.OpenAIEmbeddings({
        openAIApiKey: process.env.OPENAI_API_KEY
    });
    const pineconeClient = new pinecone_1.PineconeClient();
    yield pineconeClient.init({
        apiKey: process.env.PINECONE_API_KEY,
        environment: process.env.PINECONE_ENVIRONMENT
    });
    const pineconeIndex = pineconeClient.Index(process.env.PINECONE_INDEX);
    yield pinecone_2.PineconeStore.fromDocuments(docs, embeddings, {
        pineconeIndex
    });
});
exports.uploadDataToPinecone = uploadDataToPinecone;
