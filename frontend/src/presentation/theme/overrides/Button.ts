const Button = (theme: any): any => {
    return {
        MuiLoadingButton: {
            styleOverrides: {
                root: {
                    fontWeight: '400',
                    fontSize: '14px',
                    padding: '10px 30px'
                }
            }
        }
    }
}

export default Button