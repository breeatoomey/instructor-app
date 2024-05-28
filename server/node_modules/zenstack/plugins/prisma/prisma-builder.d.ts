/**
 * Field used by datasource and generator declarations.
 */
export type SimpleField = {
    name: string;
    text: string;
};
/**
 * Prisma schema builder
 */
export declare class PrismaModel {
    private datasources;
    private generators;
    private models;
    private enums;
    addDataSource(name: string, fields?: SimpleField[]): DataSource;
    addGenerator(name: string, fields: SimpleField[]): Generator;
    addModel(name: string): Model;
    addView(name: string): Model;
    addEnum(name: string): Enum;
    toString(): string;
}
export declare class DataSource {
    name: string;
    fields: SimpleField[];
    constructor(name: string, fields?: SimpleField[]);
    toString(): string;
}
export declare class Generator {
    name: string;
    fields: SimpleField[];
    constructor(name: string, fields: SimpleField[]);
    toString(): string;
}
export declare class DeclarationBase {
    documentations: string[];
    constructor(documentations?: string[]);
    addComment(name: string): string;
    toString(): string;
}
export declare class ContainerDeclaration extends DeclarationBase {
    attributes: (ContainerAttribute | PassThroughAttribute)[];
    constructor(documentations?: string[], attributes?: (ContainerAttribute | PassThroughAttribute)[]);
}
export declare class FieldDeclaration extends DeclarationBase {
    attributes: (FieldAttribute | PassThroughAttribute)[];
    constructor(documentations?: string[], attributes?: (FieldAttribute | PassThroughAttribute)[]);
}
export declare class Model extends ContainerDeclaration {
    name: string;
    isView: boolean;
    fields: ModelField[];
    constructor(name: string, isView: boolean, documentations?: string[]);
    addField(name: string, type: ModelFieldType | string, attributes?: (FieldAttribute | PassThroughAttribute)[], documentations?: string[], addToFront?: boolean): ModelField;
    addAttribute(name: string, args?: AttributeArg[]): ContainerAttribute;
    toString(): string;
}
export type ScalarTypes = 'String' | 'Boolean' | 'Int' | 'BigInt' | 'Float' | 'Decimal' | 'DateTime' | 'Json' | 'Bytes' | 'Unsupported';
export declare class ModelFieldType {
    type: ScalarTypes | string;
    array?: boolean | undefined;
    optional?: boolean | undefined;
    constructor(type: ScalarTypes | string, array?: boolean | undefined, optional?: boolean | undefined);
    toString(): string;
}
export declare class ModelField extends FieldDeclaration {
    name: string;
    type: ModelFieldType | string;
    constructor(name: string, type: ModelFieldType | string, attributes?: (FieldAttribute | PassThroughAttribute)[], documentations?: string[]);
    addAttribute(name: string, args?: AttributeArg[]): FieldAttribute;
    toString(): string;
}
export declare class FieldAttribute {
    name: string;
    args: AttributeArg[];
    constructor(name: string, args?: AttributeArg[]);
    toString(): string;
}
export declare class ContainerAttribute {
    name: string;
    args: AttributeArg[];
    constructor(name: string, args?: AttributeArg[]);
    toString(): string;
}
/**
 * Represents @@prisma.passthrough and @prisma.passthrough
 */
export declare class PassThroughAttribute {
    text: string;
    constructor(text: string);
    toString(): string;
}
export declare class AttributeArg {
    name: string | undefined;
    value: AttributeArgValue;
    constructor(name: string | undefined, value: AttributeArgValue);
    toString(): string;
}
export declare class AttributeArgValue {
    type: 'String' | 'FieldReference' | 'Number' | 'Boolean' | 'Array' | 'FunctionCall';
    value: string | number | boolean | FieldReference | FunctionCall | AttributeArgValue[];
    constructor(type: 'String' | 'FieldReference' | 'Number' | 'Boolean' | 'Array' | 'FunctionCall', value: string | number | boolean | FieldReference | FunctionCall | AttributeArgValue[]);
    toString(): string;
}
export declare class FieldReference {
    field: string;
    args: FieldReferenceArg[];
    constructor(field: string, args?: FieldReferenceArg[]);
}
export declare class FieldReferenceArg {
    name: string;
    value: string;
    constructor(name: string, value: string);
    toString(): string;
}
export declare class FunctionCall {
    func: string;
    args: FunctionCallArg[];
    constructor(func: string, args?: FunctionCallArg[]);
    toString(): string;
}
export declare class FunctionCallArg {
    value: string;
    constructor(value: string);
    toString(): string;
}
export declare class Enum extends ContainerDeclaration {
    name: string;
    documentations: string[];
    fields: EnumField[];
    constructor(name: string, documentations?: string[]);
    addField(name: string, attributes?: (FieldAttribute | PassThroughAttribute)[], documentations?: string[]): EnumField;
    addAttribute(name: string, args?: AttributeArg[]): ContainerAttribute;
    addComment(name: string): string;
    toString(): string;
}
export declare class EnumField extends DeclarationBase {
    name: string;
    attributes: (FieldAttribute | PassThroughAttribute)[];
    documentations: string[];
    constructor(name: string, attributes?: (FieldAttribute | PassThroughAttribute)[], documentations?: string[]);
    addAttribute(name: string, args?: AttributeArg[]): FieldAttribute;
    toString(): string;
}
