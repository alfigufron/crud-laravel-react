import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import axios from 'axios';

class StudentData extends Component {
	constructor() {
		super();
		this.state = {
			students: []
		}
	}

	componentDidMount() {
		this.getStudent();
	}

	async getStudent() {
		try {
			let res = await axios.get('/api/student/data');
			this.setState({
				students: res.data
			})
		} catch (err) {
			alert(err);
		}
	}

	async deleteStudent(id) {
		try {
			let res = await axios.delete(`/api/student/delete/${id}`);
			
			if (res.data.message == 200) this.componentDidMount();
		} catch (err) {
			alert(err)
		}
	}

	render() {
		const students = this.state.students;

		return (
			<div className="container">
				<h2 className="text-center py-3 font-weight-bold">Student Data</h2>
				<Link to="/add" className="btn btn-secondary btn-block">
					Tambah Data
				</Link>

				<div className="card py-3">
					<div className="card-body">
						<div className="table-responsive">
							<table className="table table-striped table-hover text-center">
								<thead>
									<tr>
										<th>No</th>
										<th>Nama</th>
										<th>Kelas</th>
										<th>Opsi</th>
									</tr>
								</thead>
								<tbody>
									{ students.map((item, index) => (
										<tr key={index}>
											<td>{index+1}</td>
											<td>{item.name}</td>
											<td>{item.class}</td>
											<td>
												<Link className="btn btn-secondary mr-2" to={`/edit/${item.id}`} >Edit</Link>
												<button
													className="btn btn-danger"
													onClick={() => this.deleteStudent(item.id)}
												>
													Hapus
												</button>
											</td>
										</tr>
									)) }
								</tbody>
							</table>
						</div>
					</div>
				</div>
      </div>
		)
	}
}

export default StudentData;