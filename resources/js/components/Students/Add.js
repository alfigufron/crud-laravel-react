import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

class AddStudent extends Component {
  constructor(props) {
    super(props),
    this.state = {
      name: '',
      class: '',
    }

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleNewStudent = this.handleNewStudent.bind(this);
  }

  handleFieldChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleNewStudent(e) {
    e.preventDefault();
    let student = {
      name: this.state.name,
      class: this.state.class,
    }
    
    if(student.name && student.class) {
      this.createStudent(student);
    }
  }

  async createStudent(data) {
    try {
      let res = await axios.post('/api/student/create', data);

      if (res.data.message == 200) this.props.history.push('/');
    } catch (err) {
      alert(err);
    }
  }

	render() {
		return (
      <div className="container">
        <h1 className="text-center font-weight-bold py-3">Add Student</h1>

        <div className="card">
          <div className="card-body">
            <form onSubmit={this.handleNewStudent}>

              <div className="form-group">
                <label>Nama</label>
                <input
                  id="name"
                  type="text" 
                  className="form-control"
                  name="name" 
                  value={this.state.name}
                  onChange={this.handleFieldChange} 
                />
              </div>

              <div className="form-group">
                <label>Kelas</label>
                <select
                  className="form-control"
                  name="class"
                  value={this.state.class}
                  onChange={this.handleFieldChange}
                >
                  <option disabled value="">Pilih Opsi</option>
                  <option value="10">X</option>
                  <option value="11">XI</option>
                  <option value="12">XII</option>
                </select>
              </div>

              <button className="btn btn-success btn-block">Simpan Data</button>
              <Link to="/" className="btn btn-danger btn-block">Kembali</Link>

            </form>
          </div>
        </div>
      </div>
    )
	}
}

export default AddStudent;