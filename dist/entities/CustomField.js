"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomField = void 0;
const core_1 = require("@mikro-orm/core");
const enums_1 = require("../enums");
const uuid_1 = require("uuid");
const CustomFieldOption_1 = require("./CustomFieldOption");
const Schema_1 = require("./Schema");
const type_graphql_1 = require("type-graphql");
let CustomField = class CustomField {
    constructor() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.permitEditBy = 1;
        this.type = 0;
    }
};
__decorate([
    type_graphql_1.Field(),
    core_1.PrimaryKey(),
    core_1.Formula(`${enums_1.BlockType.CUSTOMFIELD}-${uuid_1.v4()}`),
    __metadata("design:type", String)
], CustomField.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    core_1.Formula(`${enums_1.BlockType.CUSTOMDATAGROUP}-${uuid_1.v4()}`),
    __metadata("design:type", String)
], CustomField.prototype, "dataGroupId", void 0);
__decorate([
    type_graphql_1.Field(),
    core_1.Property({ type: "date" }),
    __metadata("design:type", Date)
], CustomField.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(),
    core_1.Property({ type: "date", onUpdate: () => new Date() }),
    __metadata("design:type", Date)
], CustomField.prototype, "updatedAt", void 0);
__decorate([
    type_graphql_1.Field(),
    core_1.Property({ version: true }),
    __metadata("design:type", Number)
], CustomField.prototype, "version", void 0);
__decorate([
    type_graphql_1.Field(() => Schema_1.Schema),
    core_1.ManyToOne(() => Schema_1.Schema),
    __metadata("design:type", Schema_1.Schema)
], CustomField.prototype, "schema", void 0);
__decorate([
    type_graphql_1.Field(),
    core_1.Enum({ default: 1 }),
    __metadata("design:type", Number)
], CustomField.prototype, "permitEditBy", void 0);
__decorate([
    type_graphql_1.Field(),
    core_1.Enum({ default: 0 }),
    __metadata("design:type", Number)
], CustomField.prototype, "type", void 0);
__decorate([
    type_graphql_1.Field(),
    core_1.OneToOne(),
    __metadata("design:type", CustomFieldOption_1.CustomFieldOption)
], CustomField.prototype, "fieldOption", void 0);
CustomField = __decorate([
    type_graphql_1.ObjectType(),
    core_1.Entity()
], CustomField);
exports.CustomField = CustomField;
//# sourceMappingURL=CustomField.js.map