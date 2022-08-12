import React, { Component } from 'react'
import axios from 'axios'

export default class CreateTasks extends Component {

    constructor(props) {
        super(props)

        this.onChangeFeaturename = this.onChangeFeaturename.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangeDevname = this.onChangeDevname.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //Creating variable in React
        this.state = {
            featurename: '',
            description: '',
            status: '',
            devname: ''
          }
    }

    componentDidMount() {
        this.setState({
            status: 'Default state'
        })
    }

    onChangeFeaturename(e) {
        this.setState({
            featurename: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
          description: e.target.value
        })
    }

    onChangeStatus(e) {
        this.setState({
            status: e.target.value
        })
    }

    onChangeDevname(e) {
        this.setState({
            devname: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
    
        const feature = {
            featurename: this.state.featurename,
            description: this.state.description,
            status: this.state.status,
            devname: this.state.devname
        }
        console.log(feature)

        axios.post('http://localhost:5000/tasks/add', feature)
            .then(res => console.log(res.data));

        window.location = '/'
    }

    render() {
        return (
            <div>
                <h3>Create New Task</h3>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Feature Name: </label>
                        <input 
                            type="text" 
                            className="form-control"
                            value={this.state.featurename}
                            onChange={this.onChangeFeaturename}
                            />
                    </div>

                    <div className="form-group"> 
                    <label>Description: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                        />
                    </div>

                    <div className="form-group"> 
                    <label>Status: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.status}
                        onChange={this.onChangeStatus}
                        />
                    </div>
                    
                    <div className="form-group">
                    <label>Developer Name: </label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={this.state.devname}
                        onChange={this.onChangeDevname}
                        />
                    </div>

                    <div className="form-group">
                    <input type="submit" value="Create Task" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}