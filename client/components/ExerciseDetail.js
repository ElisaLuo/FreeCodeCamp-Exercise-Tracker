import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class ExerciseDetail extends Component{
    constructor(props){
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleDurationChange = this.handleDurationChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);

        this.state ={
            name: "",
            date: 0,
            duration: new Number(),
            description: ""
        };
    }

    handleNameChange(event){this.setState({name: event.target.value});}
    handleDateChange(event){this.setState({date: event.target.value});}
    handleDurationChange(event){this.setState({duration: event.target.value});}
    handleDescriptionChange(event){this.setState({description: event.target.value});}

    componentDidMount() {
        fetch(`/api/exercise/${this.props.match.params.username}/${this.props.match.params.exerciseId}`)
            .then(res => res.json())
            .then((results) => {
                results.map(result=>{
                    this.setState({
                        name: result.name,
                        date: result.date,
                        duration: result.duration,
                        description: result.description
                    });
                })
            })
    }

    updateExercise = event => {
        event.preventDefault();
        this.setState({
            name: event.target.value,
            date: event.target.value,
            duration: event.target.value,
            description: event.target.value
        });
        axios.post(`/api/exercise/details/${this.props.match.params.exerciseId}`,{
            name: this.state.name,
            date: this.state.date,
            duration: this.state.duration,
            description: this.state.description
        }).then(response => {
            console.log(response, 'Exercise updated');
        }).catch(err => {
            console.log(err, 'Exercise not updeated');
        });
    };

    render(){
        return (
            <div>
                <input
                    onChange={this.handleNameChange}
                    placeholder="Exercise Name"
                    name="name"
                    value={this.state.name}/>
                <br/>
                <input
                    onChange={this.handleDateChange}
                    placeholder="Exercise Date"
                    name="date"
                    value={this.state.date}/>
                <br/>
                <input
                    onChange={this.handleDurationChange}
                    placeholder="Exercise Duration"
                    name="duration"
                    value={this.state.duration}/>
                <br/>
                <input
                    onChange={this.handleDescriptionChange}
                    placeholder="Exercise Description"
                    name="description"
                    value={this.state.description}/>
                <br/>
                <button
                    type={"submit"}
                    onClick={this.updateExercise}
                    >
                    Save
                    </button>
                    
            </div>
          );
    }
}


export default ExerciseDetail;
