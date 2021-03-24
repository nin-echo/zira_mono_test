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
exports.CustomBlock = void 0;
const core_1 = require("@mikro-orm/core");
const uuid_1 = require("uuid");
const Schema_1 = require("./Schema");
let CustomBlock = class CustomBlock {
    constructor() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
};
__decorate([
    core_1.PrimaryKey(),
    core_1.Formula(`${"cb"}-${uuid_1.v4()}`),
    __metadata("design:type", String)
], CustomBlock.prototype, "id", void 0);
__decorate([
    core_1.Property({ type: "date" }),
    __metadata("design:type", Date)
], CustomBlock.prototype, "createdAt", void 0);
__decorate([
    core_1.Property({ type: "date", onUpdate: () => new Date() }),
    __metadata("design:type", Date)
], CustomBlock.prototype, "updatedAt", void 0);
__decorate([
    core_1.Property({ default: "My New Block" }),
    __metadata("design:type", String)
], CustomBlock.prototype, "title", void 0);
__decorate([
    core_1.Property(),
    __metadata("design:type", Array)
], CustomBlock.prototype, "relationIds", void 0);
__decorate([
    core_1.OneToOne(() => Schema_1.Schema, (schema) => schema.parentBlock),
    __metadata("design:type", Schema_1.Schema)
], CustomBlock.prototype, "schema", void 0);
__decorate([
    core_1.Property({ version: true }),
    __metadata("design:type", Number)
], CustomBlock.prototype, "version", void 0);
CustomBlock = __decorate([
    core_1.Entity()
], CustomBlock);
exports.CustomBlock = CustomBlock;
//# sourceMappingURL=CustomBlock.js.map