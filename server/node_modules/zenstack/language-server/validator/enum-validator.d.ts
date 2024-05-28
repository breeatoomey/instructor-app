import { Enum } from '@zenstackhq/language/ast';
import { ValidationAcceptor } from 'langium';
import { AstValidator } from '../types';
/**
 * Validates enum declarations.
 */
export default class EnumValidator implements AstValidator<Enum> {
    validate(_enum: Enum, accept: ValidationAcceptor): void;
    private validateAttributes;
    private validateField;
}
