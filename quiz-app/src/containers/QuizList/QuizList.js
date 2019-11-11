import React from 'react';
import styles from './QuizList.module.css';
import {NavLink} from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import loadQuiz from "../../store/actions/quiz";




class QuizList extends React.Component {
    renderTests = () => {
        return this.props.quizes.map(quiz => {
            return (
                <li
                    key={quiz.id}
                >
                    <NavLink
                        to={'/quiz/' + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        });
    };

    async componentDidMount() {
        this.props.loadQuiz();


    }

    render() {
        return (
            <div className={styles.QuizList}>
                <div>
                    <h1>
                        Список тестов
                    </h1>

                    {this.props.loading && this.props.quizes.length !== 0
                    ? <Loader/>
                    :   <ul>
                            {this.renderTests()}
                        </ul>
                    }

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {

  return {
      loading: state.quiz.loading,
      quizes: state.quiz.quizes
  }
};

const mapDispatchToProps = dispatch => {
  return {
    loadQuiz: ()=> dispatch(loadQuiz())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
