import { DataSource } from '@zenstackhq/language/ast';
import { AstValidator } from '../types';
import { ValidationAcceptor } from 'langium';
/**
 * Validates data source declarations.
 */
export default class DataSourceValidator implements AstValidator<DataSource> {
    validate(ds: DataSource, accept: ValidationAcceptor): void;
    private validateProvider;
    private validateUrl;
    private validateRelationMode;
}
