import { Attribute } from '@zenstackhq/language/ast';
import { ValidationAcceptor } from 'langium';
import { AstValidator } from '../types';
/**
 * Validates attribute declarations.
 */
export default class AttributeValidator implements AstValidator<Attribute> {
    validate(attr: Attribute, accept: ValidationAcceptor): void;
}
