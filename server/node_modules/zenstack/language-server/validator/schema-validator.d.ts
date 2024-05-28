import { Model } from '@zenstackhq/language/ast';
import { LangiumDocuments, ValidationAcceptor } from 'langium';
import { AstValidator } from '../types';
/**
 * Validates toplevel schema.
 */
export default class SchemaValidator implements AstValidator<Model> {
    protected readonly documents: LangiumDocuments;
    constructor(documents: LangiumDocuments);
    validate(model: Model, accept: ValidationAcceptor): void;
    private validateDataSources;
    private validateImports;
}
