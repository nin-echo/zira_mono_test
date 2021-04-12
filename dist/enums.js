"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomFieldType = exports.UserType = exports.BlockType = void 0;
exports.BlockType = {
    STORE: "sto",
    EMPLOYEE: "emp",
    SHIFT: "sf",
    CUSTOMBLOCK: "cb",
    CUSTOMFIELD: "cbf",
    SCHEMA: "sch",
    FIELDOPTION: "fdo",
    CUSTOMDATAGROUP: "cdg",
    OPTIONVALUE: "opv",
};
var UserType;
(function (UserType) {
    UserType[UserType["ADMIN"] = 0] = "ADMIN";
    UserType[UserType["MANAGER"] = 1] = "MANAGER";
    UserType[UserType["EMPLOYEE"] = 2] = "EMPLOYEE";
})(UserType = exports.UserType || (exports.UserType = {}));
var CustomFieldType;
(function (CustomFieldType) {
    CustomFieldType[CustomFieldType["TEXT"] = 0] = "TEXT";
    CustomFieldType[CustomFieldType["NUMBER"] = 1] = "NUMBER";
    CustomFieldType[CustomFieldType["MULTISELECTION"] = 2] = "MULTISELECTION";
    CustomFieldType[CustomFieldType["SINGLESELECTION"] = 3] = "SINGLESELECTION";
    CustomFieldType[CustomFieldType["DATE"] = 4] = "DATE";
})(CustomFieldType = exports.CustomFieldType || (exports.CustomFieldType = {}));
//# sourceMappingURL=enums.js.map