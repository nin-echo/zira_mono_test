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
exports.Schema = void 0;
const core_1 = require("@mikro-orm/core");
const enums_1 = require("../enums");
const uuid_1 = require("uuid");
const CustomBlock_1 = require("./CustomBlock");
const CustomField_1 = require("./CustomField");
const type_graphql_1 = require("type-graphql");
const graphql_type_json_1 = require("graphql-type-json");
let Schema = class Schema {
    constructor() {
        this.id = `${enums_1.BlockType.SCHEMA}-${uuid_1.v4()}`;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.customFields = new core_1.Collection(this);
    }
};
__decorate([
    type_graphql_1.Field(),
    core_1.PrimaryKey(),
    __metadata("design:type", String)
], Schema.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    core_1.Property({ type: "date" }),
    __metadata("design:type", Date)
], Schema.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(),
    core_1.Property({ type: "date", onUpdate: () => new Date() }),
    __metadata("design:type", Date)
], Schema.prototype, "updatedAt", void 0);
__decorate([
    type_graphql_1.Field(() => graphql_type_json_1.GraphQLJSONObject),
    core_1.Property({ type: "json", nullable: true }),
    __metadata("design:type", Object)
], Schema.prototype, "view", void 0);
__decorate([
    type_graphql_1.Field(() => CustomBlock_1.CustomBlock),
    core_1.OneToOne(() => CustomBlock_1.CustomBlock),
    __metadata("design:type", CustomBlock_1.CustomBlock)
], Schema.prototype, "parentBlock", void 0);
__decorate([
    type_graphql_1.Field(() => [CustomField_1.CustomField]),
    core_1.OneToMany(() => CustomField_1.CustomField, (customField) => customField.schema),
    __metadata("design:type", Object)
], Schema.prototype, "customFields", void 0);
__decorate([
    type_graphql_1.Field(),
    core_1.Property({ version: true }),
    __metadata("design:type", Number)
], Schema.prototype, "version", void 0);
Schema = __decorate([
    type_graphql_1.ObjectType(),
    core_1.Entity()
], Schema);
exports.Schema = Schema;
//# sourceMappingURL=Schema.js.map