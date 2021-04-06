import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class ProdutoList extends Component {

  constructor(props) {
    super(props);
    this.state = {produtos: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('api/produtos')
      .then(response => response.json())
      .then(data => this.setState({produtos: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/api/produto/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedprodutos = [...this.state.produtos].filter(i => i.id !== id);
      this.setState({produtos: updatedprodutos});
    });
  }

  render() {
    const {produtos, isLoading} = this.state;

    if (isLoading) {
      return <p>Carregando...</p>;
    }

    const produtoList = produtos.map(produto => {
      return <tr key={produto.id}>
        <td style={{whiteSpace: 'nowrap'}}>{produto.nome}</td>
        <td>{produto.preco}</td>
        <td>{produto.descricao}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/produtos/" + produto.id}>Editar</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(produto.id)}>Deletar</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/produtos/new">Adicionar Produto</Button>
          </div>
          <h3>Lista de Produtos</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">Nome</th>
                <th width="20%">Preço</th>
                <th>Descrição</th>
                <th width="10%">Açôes</th>
              </tr>
            </thead>
            <tbody>
            {produtoList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default ProdutoList;