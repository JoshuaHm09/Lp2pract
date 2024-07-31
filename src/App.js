import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Table, Button, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter } from 'reactstrap';

const data = [
  { id: 1, busNumero: '1234', modelo: 'Volvo B9R', capacity: 50, year: 2018, status: 'Activo' },
  { id: 2, busNumero: '2345', modelo: 'Mercedes Sprinter', capacity: 20, year: 2019, status: 'Inactivo' },
  { id: 3, busNumero: '3456', modelo: 'Scania K360', capacity: 45, year: 2020, status: 'Activo' },
  { id: 4, busNumero: '4567', modelo: 'Volvo B11R', capacity: 55, year: 2021, status: 'Activo' },
  { id: 5, busNumero: '5678', modelo: 'Mercedes-Benz Tourismo', capacity: 40, year: 2017, status: 'Inactivo' },
  { id: 6, busNumero: '6789', modelo: 'MAN Lion’s Coach', capacity: 50, year: 2018, status: 'Activo' },
  { id: 7, busNumero: '7890', modelo: 'Setra S 431 DT', capacity: 70, year: 2016, status: 'Activo' },
  { id: 8, busNumero: '8901', modelo: 'Iveco Magelys', capacity: 30, year: 2022, status: 'Inactivo' },
  { id: 9, busNumero: '9012', modelo: 'Temsa HD12', capacity: 35, year: 2021, status: 'Activo' },
  { id: 10, busNumero: '0123', modelo: 'VDL Futura FHD2', capacity: 55, year: 2019, status: 'Activo' },
];

class App extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      busNumero: "",
      modelo: "",
      capacity: "",
      year: "",
      status: "",
    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      form: {
        id: "",
        busNumero: "",
        modelo: "",
        capacity: "",
        year: "",
        status: "",
      },
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    const updatedData = this.state.data.map((registro) =>
      registro.id === dato.id ? { ...registro, ...dato } : registro
    );
    this.setState({ data: updatedData, modalActualizar: false });
  };

  eliminar = (dato) => {
    const opcion = window.confirm(`Estás Seguro que deseas Eliminar el elemento ${dato.id}`);
    if (opcion) {
      const updatedData = this.state.data.filter((registro) => registro.id !== dato.id);
      this.setState({ data: updatedData, modalActualizar: false });
    }
  };

  insertar = () => {
    const nuevoBus = { ...this.state.form, id: this.state.data.length + 1 };
    const updatedData = [...this.state.data, nuevoBus];
    this.setState({ data: updatedData, modalInsertar: false });
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    return (
      <>
        <Container>
          <h1>Lista de Autobuses</h1>
          <br />
          <Button color="success" onClick={this.mostrarModalInsertar}>Insertar nuevo Bus</Button>
          <br /><br />
          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Bus Numero</th>
                <th>Modelo</th>
                <th>Capacidad</th>
                <th>Año</th>
                <th>Estatus</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((elemento) => (
                <tr key={elemento.id}>
                  <td>{elemento.id}</td>
                  <td>{elemento.busNumero}</td>
                  <td>{elemento.modelo}</td>
                  <td>{elemento.capacity}</td>
                  <td>{elemento.year}</td>
                  <td>{elemento.status}</td>
                  <td>
                    <Button color="primary" onClick={() => this.mostrarModalActualizar(elemento)}>Editar</Button>{' '}
                    <Button color="danger" onClick={() => this.eliminar(elemento)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
            <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id:
              </label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Bus Numero:
              </label>
              <input
                className="form-control"
                name="busNumero"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.busNumero}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Modelo:
              </label>
              <input
                className="form-control"
                name="modelo"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.modelo}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Capacidad:
              </label>
              <input
                className="form-control"
                name="capacity"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.capacity}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Año:
              </label>
              <input
                className="form-control"
                name="year"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.year}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Estatus:
              </label>
              <input
                className="form-control"
                name="status"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.status}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={this.cerrarModalActualizar}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div><h3>Insertar Bus</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id:
              </label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length + 1}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Bus Numero:
              </label>
              <input
                className="form-control"
                name="busNumero"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Modelo:
              </label>
              <input
                className="form-control"
                name="modelo"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Capacidad:
              </label>
              <input
                className="form-control"
                name="capacity"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Año:
              </label>
              <input
                className="form-control"
                name="year"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Estatus:
              </label>
              <input
                className="form-control"
                name="status"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={this.insertar}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={this.cerrarModalInsertar}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default App;
