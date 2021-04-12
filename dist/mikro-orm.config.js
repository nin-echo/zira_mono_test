"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const CustomBlock_1 = require("./entities/CustomBlock");
const CustomField_1 = require("./entities/CustomField");
const CustomFieldOption_1 = require("./entities/CustomFieldOption");
const Schema_1 = require("./entities/Schema");
const path_1 = __importDefault(require("path"));
const CustomFieldOptionValue_1 = require("./entities/CustomFieldOptionValue");
exports.default = {
    migrations: {
        path: path_1.default.join(__dirname, "./migrations"),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [CustomBlock_1.CustomBlock, CustomField_1.CustomField, Schema_1.Schema, CustomFieldOption_1.CustomFieldOption, CustomFieldOptionValue_1.OptionValue],
    dbName: "ziratest",
    type: "postgresql",
    user: "bingqiliu",
    debug: !constants_1.__prod__,
};
//# sourceMappingURL=mikro-orm.config.js.map