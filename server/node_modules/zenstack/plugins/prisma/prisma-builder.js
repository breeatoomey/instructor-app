"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumField = exports.Enum = exports.FunctionCallArg = exports.FunctionCall = exports.FieldReferenceArg = exports.FieldReference = exports.AttributeArgValue = exports.AttributeArg = exports.PassThroughAttribute = exports.ContainerAttribute = exports.FieldAttribute = exports.ModelField = exports.ModelFieldType = exports.Model = exports.FieldDeclaration = exports.ContainerDeclaration = exports.DeclarationBase = exports.Generator = exports.DataSource = exports.PrismaModel = void 0;
const indent_string_1 = __importDefault(require("./indent-string"));
/**
 * Prisma schema builder
 */
class PrismaModel {
    constructor() {
        this.datasources = [];
        this.generators = [];
        this.models = [];
        this.enums = [];
    }
    addDataSource(name, fields = []) {
        const ds = new DataSource(name, fields);
        this.datasources.push(ds);
        return ds;
    }
    addGenerator(name, fields) {
        const generator = new Generator(name, fields);
        this.generators.push(generator);
        return generator;
    }
    addModel(name) {
        const model = new Model(name, false);
        this.models.push(model);
        return model;
    }
    addView(name) {
        const model = new Model(name, true);
        this.models.push(model);
        return model;
    }
    addEnum(name) {
        const e = new Enum(name);
        this.enums.push(e);
        return e;
    }
    toString() {
        return [...this.datasources, ...this.generators, ...this.enums, ...this.models]
            .map((d) => d.toString())
            .join('\n\n');
    }
}
exports.PrismaModel = PrismaModel;
class DataSource {
    constructor(name, fields = []) {
        this.name = name;
        this.fields = fields;
    }
    toString() {
        return (`datasource ${this.name} {\n` +
            this.fields.map((f) => (0, indent_string_1.default)(`${f.name} = ${f.text}`)).join('\n') +
            `\n}`);
    }
}
exports.DataSource = DataSource;
class Generator {
    constructor(name, fields) {
        this.name = name;
        this.fields = fields;
    }
    toString() {
        return (`generator ${this.name} {\n` +
            this.fields.map((f) => (0, indent_string_1.default)(`${f.name} = ${f.text}`)).join('\n') +
            `\n}`);
    }
}
exports.Generator = Generator;
class DeclarationBase {
    constructor(documentations = []) {
        this.documentations = documentations;
    }
    addComment(name) {
        this.documentations.push(name);
        return name;
    }
    toString() {
        return this.documentations.map((x) => `${x}\n`).join('');
    }
}
exports.DeclarationBase = DeclarationBase;
class ContainerDeclaration extends DeclarationBase {
    constructor(documentations = [], attributes = []) {
        super(documentations);
        this.attributes = attributes;
    }
}
exports.ContainerDeclaration = ContainerDeclaration;
class FieldDeclaration extends DeclarationBase {
    constructor(documentations = [], attributes = []) {
        super(documentations);
        this.attributes = attributes;
    }
}
exports.FieldDeclaration = FieldDeclaration;
class Model extends ContainerDeclaration {
    constructor(name, isView, documentations = []) {
        super(documentations);
        this.name = name;
        this.isView = isView;
        this.fields = [];
    }
    addField(name, type, attributes = [], documentations = [], addToFront = false) {
        const field = new ModelField(name, type, attributes, documentations);
        if (addToFront) {
            this.fields.unshift(field);
        }
        else {
            this.fields.push(field);
        }
        return field;
    }
    addAttribute(name, args = []) {
        const attr = new ContainerAttribute(name, args);
        this.attributes.push(attr);
        return attr;
    }
    toString() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = [...this.fields];
        if (this.attributes.length > 0) {
            // Add a blank line before the attributes
            result.push('');
        }
        result.push(...this.attributes);
        return (super.toString() +
            `${this.isView ? 'view' : 'model'} ${this.name} {\n` +
            (0, indent_string_1.default)(result.map((d) => d.toString()).join('\n')) +
            `\n}`);
    }
}
exports.Model = Model;
class ModelFieldType {
    constructor(type, array, optional) {
        this.type = type;
        this.array = array;
        this.optional = optional;
    }
    toString() {
        return `${this.type}${this.array ? '[]' : ''}${this.optional ? '?' : ''}`;
    }
}
exports.ModelFieldType = ModelFieldType;
class ModelField extends FieldDeclaration {
    constructor(name, type, attributes = [], documentations = []) {
        super(documentations, attributes);
        this.name = name;
        this.type = type;
    }
    addAttribute(name, args = []) {
        const attr = new FieldAttribute(name, args);
        this.attributes.push(attr);
        return attr;
    }
    toString() {
        return (super.toString() +
            `${this.name} ${this.type}` +
            (this.attributes.length > 0 ? ' ' + this.attributes.map((a) => a.toString()).join(' ') : ''));
    }
}
exports.ModelField = ModelField;
class FieldAttribute {
    constructor(name, args = []) {
        this.name = name;
        this.args = args;
    }
    toString() {
        return `${this.name}(` + this.args.map((a) => a.toString()).join(', ') + `)`;
    }
}
exports.FieldAttribute = FieldAttribute;
class ContainerAttribute {
    constructor(name, args = []) {
        this.name = name;
        this.args = args;
    }
    toString() {
        return `${this.name}(` + this.args.map((a) => a.toString()).join(', ') + `)`;
    }
}
exports.ContainerAttribute = ContainerAttribute;
/**
 * Represents @@prisma.passthrough and @prisma.passthrough
 */
class PassThroughAttribute {
    constructor(text) {
        this.text = text;
    }
    toString() {
        return this.text;
    }
}
exports.PassThroughAttribute = PassThroughAttribute;
class AttributeArg {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
    toString() {
        return this.name ? `${this.name}: ${this.value}` : this.value.toString();
    }
}
exports.AttributeArg = AttributeArg;
class AttributeArgValue {
    constructor(type, value) {
        this.type = type;
        this.value = value;
        switch (type) {
            case 'String':
                if (typeof value !== 'string')
                    throw new Error('Value must be string');
                break;
            case 'Number':
                if (typeof value !== 'number' && typeof value !== 'string')
                    throw new Error('Value must be number or string');
                break;
            case 'Boolean':
                if (typeof value !== 'boolean')
                    throw new Error('Value must be boolean');
                break;
            case 'Array':
                if (!Array.isArray(value))
                    throw new Error('Value must be array');
                break;
            case 'FieldReference':
                if (typeof value !== 'string' && !(value instanceof FieldReference))
                    throw new Error('Value must be string or FieldReference');
                break;
            case 'FunctionCall':
                if (!(value instanceof FunctionCall))
                    throw new Error('Value must be FunctionCall');
                break;
        }
    }
    toString() {
        switch (this.type) {
            case 'String':
                // use JSON.stringify to escape quotes
                return JSON.stringify(this.value);
            case 'Number':
                return this.value.toString();
            case 'FieldReference': {
                if (typeof this.value === 'string') {
                    return this.value;
                }
                else {
                    const fr = this.value;
                    let r = fr.field;
                    if (fr.args.length > 0) {
                        r += '(' + fr.args.map((a) => a.toString()).join(',') + ')';
                    }
                    return r;
                }
            }
            case 'FunctionCall':
                return this.value.toString();
            case 'Boolean':
                return this.value ? 'true' : 'false';
            case 'Array':
                return '[' + this.value.map((v) => v.toString()).join(', ') + ']';
            default:
                throw new Error(`Unknown attribute value type ${this.type}`);
        }
    }
}
exports.AttributeArgValue = AttributeArgValue;
class FieldReference {
    constructor(field, args = []) {
        this.field = field;
        this.args = args;
    }
}
exports.FieldReference = FieldReference;
class FieldReferenceArg {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
    toString() {
        return `${this.name}: ${this.value}`;
    }
}
exports.FieldReferenceArg = FieldReferenceArg;
class FunctionCall {
    constructor(func, args = []) {
        this.func = func;
        this.args = args;
    }
    toString() {
        return `${this.func}` + '(' + this.args.map((a) => a.toString()).join(', ') + ')';
    }
}
exports.FunctionCall = FunctionCall;
class FunctionCallArg {
    constructor(value) {
        this.value = value;
    }
    toString() {
        return this.value;
    }
}
exports.FunctionCallArg = FunctionCallArg;
class Enum extends ContainerDeclaration {
    constructor(name, documentations = []) {
        super(documentations);
        this.name = name;
        this.documentations = documentations;
        this.fields = [];
    }
    addField(name, attributes = [], documentations = []) {
        const field = new EnumField(name, attributes, documentations);
        this.fields.push(field);
        return field;
    }
    addAttribute(name, args = []) {
        const attr = new ContainerAttribute(name, args);
        this.attributes.push(attr);
        return attr;
    }
    addComment(name) {
        this.documentations.push(name);
        return name;
    }
    toString() {
        return (super.toString() +
            `enum ${this.name} {\n` +
            (0, indent_string_1.default)([...this.fields, ...this.attributes].map((d) => d.toString()).join('\n')) +
            '\n}');
    }
}
exports.Enum = Enum;
class EnumField extends DeclarationBase {
    constructor(name, attributes = [], documentations = []) {
        super();
        this.name = name;
        this.attributes = attributes;
        this.documentations = documentations;
    }
    addAttribute(name, args = []) {
        const attr = new FieldAttribute(name, args);
        this.attributes.push(attr);
        return attr;
    }
    toString() {
        return (super.toString() +
            this.name +
            (this.attributes.length > 0 ? ' ' + this.attributes.map((a) => a.toString()).join(' ') : ''));
    }
}
exports.EnumField = EnumField;
//# sourceMappingURL=prisma-builder.js.map