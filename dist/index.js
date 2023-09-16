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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("body-parser");
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const readGitbookData_1 = require("./utils/readGitbookData");
const uploadDataToPinecone_1 = require("./utils/uploadDataToPinecone");
const queryPineconeData_1 = require("./utils/queryPineconeData");
const cors_1 = __importDefault(require("cors"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const PORT = 8080;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, body_parser_1.urlencoded)({ extended: false }));
app.listen(PORT, () => console.log(`${PORT}`));
app.post('/api/load', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = yield req.body;
    try {
        const { texts } = yield (0, readGitbookData_1.readGitbookData)(url);
        // add docs to vector db
        yield (0, uploadDataToPinecone_1.uploadDataToPinecone)(texts);
        res.status(200).json({ message: 'Successfully Created DB ' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err });
    }
}));
app.post('/api/query', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prompt } = yield req.body;
    try {
        console.log(prompt);
        const response = yield (0, queryPineconeData_1.queryPineconeData)(prompt);
        res.status(200).json({ response });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err });
    }
}));
