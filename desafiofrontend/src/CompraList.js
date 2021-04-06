import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class CompraList extends Component {

  constructor(props) {
    super(props);
    this.state = {compras: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('api/compras')
      .then(response => response.json())
      .then(data => this.setState({compras: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/api/compra/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedcompras = [...this.state.compras].filter(i => i.id !== id);
      this.setState({compras: updatedcompras});
    });
  }

  render() {
    const {compras, isLoading} = this.state;

    if (isLoading) {
      return <p>Carregando...</p>;
    }

    const CompraList = compras.map(compra => {
      return <tr key={compra.id}>
        <td style={{whiteSpace: 'nowrap'}}>{compra.total}</td>
        <td>{compra.tipo_pagamento}</td>
        <td>{compra.status}</td>
        <td><a href={compra.copyright}>{compra.copyright}</a></td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/compras/" + compra.id}>Editar</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(compra.id)}>Deletar</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/compras/new">Adicionar Compra</Button>
          </div>
          <h3>Lista de Compras</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">Total</th>
                <th width="20%">Tipo de pagamento</th>
                <th>Status</th>
               
                <th width="10%">Açôes</th>
              </tr>
            </thead>
            <tbody>
            {CompraList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default CompraList;