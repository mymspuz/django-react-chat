import {ValidationBuilder, ValidationComposite} from '../../../../validation/validators'

export const makeRoomsValidation = (): ValidationComposite => {
    return ValidationComposite.build([
        ...ValidationBuilder.field('roomname').required().min(5).build(),
    ])
}