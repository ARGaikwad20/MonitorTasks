import React, { Component } from 'react'
import axios from 'axios'

export default class EditTasks extends Component {
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
            devname: '',
            featuresArr: [],
            statusOptionsArr: ['Default','ToDo', 'In_progress', 'Done'],
            updateId: undefined
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/tasks/')
        .then(response => {
            if (response.data.length > 0) {
                this.setState({
                    featuresArr: response.data.map(task => task.featurename),
                })
            }
        })
        .catch((error) => {
            console.log(error);
        })

        axios.get('http://localhost:5000/tasks/')
        .then(response => {
            if (response.data.length > 0) {
                for (let i = 0; i < this.state.featuresArr.length; i++) {
                    if(response.data[i].featurename === this.state.featurename) {
                        this.setState({
                            updateId: response.data[i]._id
                        })
                    }
                }
            }
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
 
    }

    render() {
        return (
            <div>
                <h3>Update Tasks</h3>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group"> 
                            <label>Feature Name:  </label>
                            <select ref="userInput"
                                required
                                className="form-control"
                                value={this.state.featurename}
                                onChange={this.onChangeFeaturename}>
                                {
                                    this.state.featuresArr.map(function(feature) {
                                    return <option 
                                        key={feature}
                                        value={feature}>{feature}
                                        </option>;
                                    })
                                }
                            </select>
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
                            <label>Status:  </label>
                            <select ref="userInput"
                                required
                                className="form-control"
                                value={this.state.status}
                                onChange={this.onChangeStatus}>
                                {
                                    this.state.statusOptionsArr.map(function(feature) {
                                    return <option 
                                        key={feature}
                                        value={feature}>{feature}
                                        </option>;
                                    })
                                }
                            </select>
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
                    <input type="submit" value="Update Task" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}