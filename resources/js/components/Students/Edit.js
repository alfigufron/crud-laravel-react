import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

class EditStudent extends Component {
  constructor() {
    super();
    this.state = {
      name : "",
      class: ""
    }

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleUpdateStudent = this.handleUpdateStudent.bind(this);
  }

  componentDidMount() {
    let _id = this.props.match.params.id;

    axios.get(`/api/student/edit/${_id}`).then(res => {
      this.setState({
        name: res.data.name,
        class: res.data.class
      });
    });
  }

  handleFieldChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleUpdateStudent(e) {
    e.preventDefault();
    let student = {
      name: this.state.name,
      class: this.state.class,
    }

    if(student.name && student.class) {
      this.updateStudent(student);
    }
  }

  async updateStudent(data) {
    let _id = this.props.match.params.id;

    try {
      let res = await axios.put(`/api/student/update/${_id}`, data);

      if (res.data.message == 200) this.props.history.push('/');
    } catch (err) {
      alert(err);
    }
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center font-weight-bold py-3">Edit Student</h1>

        <div className="card">
          <div className="card-body">
            <form onSubmit={this.handleUpdateStudent}>

              <div className="form-group">
                <label>Nama</label>
                <input
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

              <button className="btn btn-success btn-block">Simpan Perubahan Data</button>
              <Link to="/" className="btn btn-danger btn-block">Kembali</Link>

            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default EditStudent;