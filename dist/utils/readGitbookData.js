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
exports.readGitbookData = void 0;
const gitbook_1 = require("langchain/document_loaders/web/gitbook");
const text_splitter_1 = require("langchain/text_splitter");
const readGitbookData = (gitbookUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const urlLoader = new gitbook_1.GitbookLoader(gitbookUrl, {
        shouldLoadAllPaths: true
    });
    const docs = yield urlLoader.load();
    const textSplitter = new text_splitter_1.CharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 0
    });
    const texts = yield textSplitter.splitDocuments(docs);
    return { texts };
});
exports.readGitbookData = readGitbookData;
