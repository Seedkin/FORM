import {useState} from 'react'

const initialState = {
    email: '',
    password: '',
    password2: '',
}

export const useStore = () => {
    const [state, setState] = useState(initialState)

    return {
        getState: () => state,
        updateState: (fieldName, newValue) => {
            setState((prev) => ({...prev, [fieldName]: newValue}))
        },
        resetState: () => setState(initialState),
    }
}
