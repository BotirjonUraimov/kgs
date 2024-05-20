"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
// Routes
const itemsRoute_1 = __importDefault(require("./routers/itemsRoute"));
const usersRoute_1 = __importDefault(require("./routers/usersRoute"));
app.use("/api/items", itemsRoute_1.default);
app.use("/api/users", usersRoute_1.default);
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
exports.default = app;
