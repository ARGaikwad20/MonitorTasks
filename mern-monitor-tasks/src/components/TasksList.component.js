import React, { Component } from 'react'
import axios from 'axios'

const Feature = props => (
    <tr>
      <td>{props.feature.featurename}</td>
      <td>{props.feature.description}</td>
      <td>{props.feature.status}</td>
      <td>{props.feature.devname}</td>
      <td>
        <a href="#" onClick={() => { props.deleteTasks(props.feature._id) }}>delete</a>
      </td>
    </tr>
)

export default class TasksList extends Component {
    constructor(props) {
        super(props);
    
        this.deleteTasks = this.deleteTasks.bind(this)
    
        this.state = {tasks: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/tasks/')
        .then(response => {
            this.setState({ tasks: response.data })
        })
        .catch((error) => {
            console.log(error);
        })
    }

    deleteTasks(id) {
        axios.delete('http://localhost:5000/tasks/' + id)
          .then(response => { console.log(response.data)});
    
        this.setState({
          tasks: this.state.tasks.filter(el => el._id !== id)
        })
    }

    featureList() {
        return this.state.tasks.map(currentfeature => {
            return <Feature feature = {currentfeature} deleteTasks = {this.deleteTasks} key={currentfeature._id}/>;
        })
    }  

    render() {
        return (
            <div>
                <h3>Logged Tasks</h3>
                <table className="table">
                <thead className="thead-light">
                    <tr>
                    <th>Feature Name</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Developer Name</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { this.featureList() }
                </tbody>
                </table>
        </div>
        )
    }
}