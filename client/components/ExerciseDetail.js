import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Input, List, Button, Form, Label } from 'semantic-ui-react';
import Calendar from 'react-calendar';
import DatePicker from 'react-date-picker';

class ExerciseDetail extends Component{
    constructor(props){
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleDurationChange = this.handleDurationChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);

        this.state ={
            name: "",
            date: new Date(),
            duration: new Number(),
            description: ""
        };
    }

    handleNameChange(event){this.setState({name: event.target.value});}
    handleDateChange = date => this.setState({date: date});
    handleDurationChange(event){this.setState({duration: event.target.value});}
    handleDescriptionChange(event){this.setState({description: event.target.value});}

    componentDidMount() {
        fetch(`/api/exercise/${this.props.match.params.username}/${this.props.match.params.exerciseId}`)
            .then(res => res.json())
            .then((results) => {
                results.map(result=>{
                    this.setState({
                        name: result.name,
                        date: new Date(result.date),
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
        //console.log(this.state);
        this.setState({
            name: this.state.name,
            date: this.state.date,
            duration: this.state.duration,
            description: this.state.description
        });
    };

    render(){
        return (
            <div>
                <Form>
                    <Form.Input fluid label="Exercise Name" 
                        placeholder="Exercise Name"
                        onChange={this.handleNameChange}
                        name="name"
                        value={this.state.name}/>
                    <Form.Group>
                        <b>Date</b><br/>
                        <DatePicker 
                            onChange={this.handleDateChange}
                            value={this.state.date}
                            height="10vh"/>
                        <Form.Input fluid label="Exercise Duration" 
                            onChange={this.handleDurationChange}
                            placeholder="Exercise Duration"
                            name="duration"
                            value={this.state.duration}/>
                    </Form.Group>
                    <Form.TextArea label="Description" 
                        onChange={this.handleDescriptionChange}
                        placeholder="Exercise Description"
                        name="description"
                        value={this.state.description} />
                    <Form.Button type={"submit"}
                        onClick={this.updateExercise}>Save</Form.Button>
                </Form>
            </div>
          );
    }
}


export default ExerciseDetail;
