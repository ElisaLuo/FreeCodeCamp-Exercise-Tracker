import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Input, List, Button, Form, Label, Icon } from 'semantic-ui-react';
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
            description: "",
            user: ""
        };
    }

    handleNameChange(event){this.setState({name: event.target.value});}
    handleDateChange = date => this.setState({date: date});
    handleDurationChange(event){this.setState({duration: event.target.value});}
    handleDescriptionChange(event){this.setState({description: event.target.value});}

    componentDidMount() {
        fetch(`/api/exercise/details/${this.props.match.params.exerciseId}`)
            .then(res => res.json())
            .then((results) => {
                results.map(result=>{
                    this.setState({
                        name: result.name,
                        date: new Date(result.date),
                        duration: result.duration,
                        description: result.description,
                        user: result.user
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
        alert("Exercise Updated");
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
                <Form inverted>
                    <Form.Input inverted fluid label="Exercise Name" 
                        placeholder="Exercise Name"
                        onChange={this.handleNameChange}
                        name="name"
                        value={this.state.name}/>
                    <Form.Group>
                        <b style={{"color": "white"}}>Date</b><br/>
                        <DatePicker inverted
                            onChange={this.handleDateChange}
                            value={this.state.date}
                            height="10vh"/>
                        <Form.Input fluid inverted label="Exercise Duration (Minutes)" 
                            onChange={this.handleDurationChange}
                            placeholder="Exercise Duration"
                            name="duration"
                            value={this.state.duration}/>
                    </Form.Group>
                    <Form.TextArea inverted label="Description" 
                        onChange={this.handleDescriptionChange}
                        placeholder="Exercise Description"
                        name="description"
                        value={this.state.description} />
                    <Form.Group style={{"margin-left": "25%"}}>
                        <Link to={`/user/${this.state.user}`}>
                            <Form.Button inverted>
                                <Icon name="angle left"></Icon> Back
                            </Form.Button>
                        </Link>
                        <Form.Button inverted type={"submit"}
                            onClick={this.updateExercise}>Save</Form.Button>
                    </Form.Group>
                </Form>
            </div>
          );
    }
}


export default ExerciseDetail;
