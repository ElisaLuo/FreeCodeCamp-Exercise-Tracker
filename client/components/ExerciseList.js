import React, {Component} from 'react';
import axios from 'axios';

class ExerciseList extends Component{
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state ={
            exercise: "",
            exercises: []
        };
    }

    componentDidMount() {
        console.log(this.props);
        fetch(`/api/exercise/${this.props.match.params.username}`)
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    exercises: result
                });
                }
            )
    }

    componentDidUpdate() {
        fetch(`/api/exercise/${this.props.match.params.username}`)
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    exercises: result
                });
                }
            )
    }

    handleChange(event){
        this.setState({
            exercise: event.target.value
        });
    }

    addExercise = event => {
        console.log(this.props);
        event.preventDefault();
        this.setState({
            user: this.props.match.params.username,
            exercise: event.target.value
        });
        axios.post(`/api/exercise/${this.props.match.params.username}`,{
            exercise: this.state.exercise
        }).then(response => {
            
            console.log(response, 'Exercise added');
        }).catch(err => {
            console.log(err, 'Exercise not added');
        });
    };

    render(){
        const {exercises} = this.state;
        return (
            <div>
                <input
                    onChange={this.handleChange}
                    placeholder="Add Exercise"
                    name="exercise"
                    value={this.state.exercise}/>
                <button
                    type={"submit"}
                    onClick={this.addExercise}
                    >
                    Submit
                    </button>
                    {exercises.map(exercise => <div>{exercise.name}<br/></div>)}
            </div>
          );
    }
}


export default ExerciseList;
