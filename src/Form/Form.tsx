import React, {useEffect, useState} from "react";

interface IValidations {
    isEmpty?: boolean,
    minLength: number,
    isEmail?: boolean
}

interface IInput {
    value: string,
    onChange: object,
    onBlur: object,
    clearInput: object,
    isVisited: boolean,
    errorText: string,
    isEmpty?: boolean,
    minLengthError?: boolean,
    mailError?:boolean
}

const useInput = (initialValue: string, validations: IValidations) => {
    const [value, setValue] = useState(initialValue)
    const [isVisited, setVisited] = useState(false)
    const valid = useValidation(value, validations)
    const [errorText, setErrorText] = useState('')

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const onBlur = () => {
        setVisited(true)
    }

    const clearInput = () => {
        setValue('')
    }

    useEffect(() => {
        if (isVisited && valid.isEmpty) {
            setErrorText("Поле не может быть пустым")
            return
        } else if (isVisited && valid.minLengthError) {
            setErrorText("Неккоректная длина")
            return
        } else if ( isVisited && valid.mailError) {
            setErrorText("Укажите корректный email адрес")
            return
        } else if (valid.inputValid) {
            setErrorText("")
        }
    }, [value])

    return {
        value,
        onChange,
        onBlur,
        clearInput,
        isVisited,
        errorText,
        ...valid
    }
}

const useValidation = (value: string, validations: IValidations): any => {
    const [isEmpty, setEmpty] = useState(true)
    const [minLengthError, setMinLengthError] = useState(false)
    const [mailError, setMailError] = useState(false)
    const [inputValid, setInputValid] = useState(false)

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'minLength':
                    value.length < validations.minLength ? setMinLengthError(true) : setMinLengthError(false)
                    break;
                case 'isEmpty':
                    value ? setEmpty(false) : setEmpty(true)
                    break;
                case 'isEmail':
                    (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) ? setMailError(false) : setMailError(true)
                    break
            }
        }
    }, [value])

    useEffect(()=> {
        if (isEmpty || minLengthError || mailError) {
            setInputValid(false)
        } else {
            setInputValid(true)
        }
    }, [isEmpty, minLengthError, mailError])

    return {
        isEmpty,
        minLengthError,
        mailError,
        inputValid
    }
}

const Form: React.FC = () => {

    const email = useInput('', { isEmpty: true, minLength: 3, isEmail: true})
    const password = useInput('', { isEmpty: true, minLength: 8})

    const submitForm = (e:React.FormEvent) => {
        e.preventDefault()
        setTimeout(()=>{
            Math.round(Math.random()) ? console.log('Вход выполнен') : console.log('Неверный логин или пароль')
        }, 300)
        email.clearInput()
        password.clearInput()
    }

    return (
        <div className="Form">
            <form className="form-wrap" onSubmit={(e)=>submitForm(e)}>
                <h3>Вход</h3>
                <p className="gray">Для существующих пользователей</p>

                <div className="email input">
                    <label htmlFor="email" className="gray">E-Mail:</label>
                    <input onChange={e => email.onChange(e)} onBlur={email.onBlur}  className="" type="text" id="email" name="email" value={email.value}/>
                    <p className="show-hint red">{email.errorText}</p>
                </div>

                <div className="password input">
                    <label htmlFor="password" className="gray">Пароль:</label>
                    <input onChange={e => password.onChange(e)} onBlur={password.onBlur} className="" type="password" id="password" name="password" value={password.value}/>
                    <p className="show-hint red">{password.errorText}</p>
                </div>

                <button type="submit" disabled={!email.inputValid || !password.inputValid}>
                    Войти в систему
                </button>

            </form>
        </div>
    );
}

export default Form;