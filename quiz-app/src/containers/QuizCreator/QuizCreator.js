import React from 'react';
import styles from './QuizCreator.module.css';
import Button from "../../components/UI/Button/Button";
import {createControl, validate, validateForm} from "../../form/formFramework";
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import {connect} from "react-redux";
import {createQuizQuestion, finishCreateQuiz} from "../../store/actions/create";


function createOptionControl(number) {
    return createControl({
        label: `Вариант ${number} `,
        errorMessage: 'Ошибка, значение не может  быть пустым',
        id: number
    }, {required: true})

}

function createFormControls() {
    return {
        question: createControl({
            label: 'Введите ваш вопрос',
            errorMessage: 'Ошибка, поле не может быть пустым'
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
}

class QuizCreator extends React.Component {

    state = {
        rightAnswerId: 1,
        isFormValid: false,
        formControls: createFormControls()
    };


    onSubmitHandler = ev => {
        ev.preventDefault();
    };

    addQuestionHandler = ev => {
        ev.preventDefault();
        const {question, option1, option2, option3, option4} = this.state.formControls;
        const questionItem = {
            question: question.value,
            id: this.props.quiz.length + 1,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]
        };
        this.props.createQuizQuestion(questionItem);
        this.setState({
            rightAnswerId: 1,
            isFormValid: false,
            formControls: createFormControls()
        })
    };

    createQuizHandler = () => {

        this.setState({
            rightAnswerId: 1,
            isFormValid: false,
            formControls: createFormControls()
        });
        this.props.finishCreateQuiz();

    };


    onChangeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};
        control.value = value;
        control.touched = true;
        control.valid = validate(control.value, control.validation);

        formControls[controlName] = control;
        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    };


    renderControls = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Auxiliary key={controlName + index}>
                    <Input
                        key={controlName + index}
                        label={control.label}
                        errorMessage={control.errorMessage}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        onChange={ev => this.onChangeHandler(ev.target.value, controlName)}
                    />

                    {index === 0 ? <hr/> : null}
                </Auxiliary>
            )
        });
    };

    selectChangeHandler = ev => {
        this.setState({
            rightAnswerId: +ev.target.value
        })
    };

    render() {

        const select = <Select
            value={this.state.rightAnswerId}
            label='Выберите правильный ответ'
            onChange={this.selectChangeHandler}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4}
            ]}
        />;
        return (
            <div className={styles.QuizCreator}>
                <div>
                    <h1>Создать тест </h1>
                    <form onSubmit={this.onSubmitHandler}>
                        {this.renderControls()}
                        {select}
                        <Button
                            type='primary'
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Добавить вопрос
                        </Button>
                        <Button
                            type='success'
                            onClick={this.createQuizHandler}
                            disabled={this.props.quiz.length === 0}
                        >
                            Создать тест
                        </Button>


                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        quiz: state.create.quiz
    };

};

const mapDispatchToProps = dispatch => {
    return {
        createQuizQuestion: item => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);