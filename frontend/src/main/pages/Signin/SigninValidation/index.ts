import {ValidationBuilder, ValidationComposite} from '../../../../validation/validators'

export const makeSigninValidation = (): ValidationComposite => {
    return ValidationComposite.build([
        ...ValidationBuilder.field('username').required().min(3).build(),
        ...ValidationBuilder.field('password').required().min(4).build()
    ])
}