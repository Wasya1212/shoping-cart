"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_beautiful_unique_validation_1 = __importDefault(require("mongoose-beautiful-unique-validation"));
const connectOptions = {
    poolSize: 10,
    reconnectInterval: 1000,
    connectTimeoutMS: 2000,
    keepAlive: 80,
    reconnectTries: 25
};
mongoose_1.default.plugin(mongoose_beautiful_unique_validation_1.default);
mongoose_1.default.Promise = Promise;
mongoose_1.default.connect('mongodb://localhost/shop', connectOptions)
    .then(() => {
    console.log("Connect to mongo!");
})
    .catch(err => {
    console.error(err);
});
exports.default = mongoose_1.default;
//# sourceMappingURL=mongoose.js.map