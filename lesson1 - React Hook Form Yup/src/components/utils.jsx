export function isRulePassedPassword(dateErrors, setValidInput) {
    setValidInput(false)
    if (!dateErrors.password?.types?.digit) {
        setValidInput(true)
    } else if (!dateErrors.password?.types?.lower) {
        setValidInput(true)
    } else if (!dateErrors.password?.types?.upper) {
        setValidInput(true)
    } else if (!dateErrors.password?.types?.special) {
        setValidInput(true)
    }
}

export function isRulePassedEmail(dateErrors, setValidEmail) {
    if (!dateErrors.email?.types?.email) {
        setValidEmail(true)
    }
}
