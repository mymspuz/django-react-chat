import {ValidationBuilder, ValidationComposite} from '../../../../validation/validators'

export const makeMessagesValidation = (): ValidationComposite => {
    return ValidationComposite.build([
        ...ValidationBuilder.field('message').required().build(),
    ])
}