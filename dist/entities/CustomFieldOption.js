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
exports.CustomFieldOption = void 0;
const core_1 = require("@mikro-orm/core");
const enums_1 = require("../enums");
const type_graphql_1 = require("type-graphql");
const uuid_1 = require("uuid");
const CustomField_1 = require("./CustomField");
const CustomFieldOptionValue_1 = require("./CustomFieldOptionValue");
let CustomFieldOption = class CustomFieldOption {
    constructor() {
        this.id = uuid_1.v4();
        this.optionId = `${enums_1.BlockType.FIELDOPTION}-${uuid_1.v4()}`;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
};
__decorate([
    type_graphql_1.Field(),
    core_1.PrimaryKey(),
    __metadata("design:type", String)
], CustomFieldOption.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    core_1.Property(),
    __metadata("design:type", String)
], CustomFieldOption.prototype, "optionId", void 0);
__decorate([
    type_graphql_1.Field(),
    core_1.Property({ type: "date" }),
    __metadata("design:type", Date)
], CustomFieldOption.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(),
    core_1.Property({ type: "date", onUpdate: () => new Date() }),
    __metadata("design:type", Date)
], CustomFieldOption.prototype, "updatedAt", void 0);
__decorate([
    type_graphql_1.Field(),
    core_1.Property({ version: true }),
    __metadata("design:type", Number)
], CustomFieldOption.prototype, "version", void 0);
__decorate([
    type_graphql_1.Field(),
    core_1.Property(),
    __metadata("design:type", String)
], CustomFieldOption.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(() => CustomField_1.CustomField),
    core_1.OneToOne(() => CustomField_1.CustomField, (parentField) => parentField.fieldOption),
    __metadata("design:type", CustomField_1.CustomField)
], CustomFieldOption.prototype, "parentField", void 0);
__decorate([
    type_graphql_1.Field(() => [CustomFieldOptionValue_1.OptionValue]),
    core_1.OneToMany(() => CustomFieldOptionValue_1.OptionValue, (optionValue) => optionValue.parentFieldOption),
    __metadata("design:type", Array)
], CustomFieldOption.prototype, "values", void 0);
CustomFieldOption = __decorate([
    type_graphql_1.ObjectType(),
    core_1.Entity()
], CustomFieldOption);
exports.CustomFieldOption = CustomFieldOption;
//# sourceMappingURL=CustomFieldOption.js.map