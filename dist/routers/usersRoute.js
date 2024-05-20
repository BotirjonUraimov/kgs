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
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
const router = express_1.default.Router();
router.post("/deduct", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, amount } = req.body;
    const client = yield pool.connect();
    try {
        yield client.query("BEGIN");
        const queryText = "UPDATE users SET balance = balance - $1 WHERE id = $2 RETURNING balance";
        const result = yield client.query(queryText, [amount, userId]);
        yield client.query("COMMIT");
        res.json(result.rows[0]);
    }
    catch (error) {
        yield client.query("ROLLBACK");
        res.status(500).json({ error: error.message });
    }
    finally {
        client.release();
    }
}));
exports.default = router;
