import Input from './Input'
import Button from './Button'

const ComponentsOverrides = (theme: any): any => {
    return Object.assign(
        Input(theme),
        Button(theme),
    )
}

export default ComponentsOverrides