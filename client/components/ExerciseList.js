import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Input, List, Button, Icon } from 'semantic-ui-react'

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
        //console.log(this.props);
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
            })
    }

    handleChange(event){
        this.setState({
            exercise: event.target.value
        });
    }

    addExercise = event => {
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
                
                {/* <div>
                    {exercises.map(exercise => <Link to={`/${exercise._id}`}>{exercise.name}<br/></Link>)}
                </div> */}
                <div>
                <List inverted link divided relaxed>
                    <Input inverted placeholder="Add Exercise"
                        value={this.state.exercise}
                        onChange={this.handleChange}
                        style={{width: "100%"}}
                        icon={<Button type={"submit"} inverted onClick={this.addExercise} icon="add circle"></Button>}/>
                    {exercises.map(exercise => <List.Item as="a" href={`/${exercise._id}`}>
                        <List.Icon name="heartbeat" size="large" />
                        <List.Content>
                            {exercise.name}
                        </List.Content>
                    </List.Item>)}
                    <Link to={`/`}>
                        <Button inverted style={{"margin-left":"40%"}}>
                            <Icon name="angle left"></Icon>Back
                        </Button>
                    </Link>
                </List>
                </div> 
            </div>
          );
    }
}

//
export default ExerciseList;
