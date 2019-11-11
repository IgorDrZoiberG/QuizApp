import React from 'react';
import styles from './Auth.module.css';
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import is from 'is_js';
import {connect} from "react-redux";
import {auth} from "../../store/actions/auth";

class Auth extends React.Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                label: 'Email',
                type: 'email',
                value: '',
                errorMessage: 'Введите корректный email',
                touched: false,
                valid: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                label: 'Password',
                type: 'password',
                value: '',
                errorMessage: 'Введите корректный пароль',
                touched: false,
                valid: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    };

    loginHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        )
    };

    registerHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        );

    };

    submitHandler = ev => {
        ev.preventDefault();
    };

    validateControl = (value, validation) => {
        if (!validation) {
            return true
        }
        let isValid = true;
        if (validation.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (validation.email) {
            isValid = is.email(value) && isValid;
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }
        return isValid;
    };

    onChangeHandler = (ev, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};
        control.touched = true;
        control.value = ev.target.value;
        control.valid = this.validateControl(control.value, control.validation);

        formControls[controlName] = control;

        let isFormValid = true;
        Object.keys(formControls).forEach(name=>{
            isFormValid = formControls[name].valid && isFormValid;
        });

        this.setState({formControls, isFormValid})
    };

    renderInputs = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Input
                    key={controlName + index}
                    label={control.label}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    errorMessage={control.errorMessage}
                    shouldValidate={!!control.validation}
                    onChange={ev => this.onChangeHandler(ev, controlName)}

                />
            )
        })

    };

    render() {
        return (
            <div className={styles.Auth}>
                <div>
                    <h1>Авторизация</h1>
                    <form onSubmit={ev => this.submitHandler(ev)} className={styles.AuthForm}>
                        {this.renderInputs()}&nbsp;
                        <Button
                            type="success"
                            onClick={this.loginHandler}
                            disabled = {!this.state.isFormValid}
                        >
                            Войти
                        </Button>
                        <Button
                            type="primary"
                            onClick={this.registerHandler}
                            disabled = {!this.state.isFormValid}
                        >
                            Зарегистрироваться
                        </Button>
                    </form>
                </div>

            </div>
        )
    }
}
const mapDispatchToProps = dispatch => {
  return {
      auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
  }
};

export default connect(null, mapDispatchToProps)(Auth);