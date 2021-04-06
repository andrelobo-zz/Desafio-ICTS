import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class ProdutoEdit extends Component {

  emptyProduto = {
    nome: '',
    preco: '',
    age: '',
    descricao: '',
    copyrigtby: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyProduto
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const produto = await (await fetch(`/api/produto/${this.props.match.params.id}`)).json();
      this.setState({item: produto});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    await fetch('/api/produto', {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/produtos');
  }

  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Edite Produto' : 'Adicione um Produto'}</h2>;

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="nome">Nome</Label>
            <Input type="text" name="nome" id="nome" value={item.nome || ''}
                   onChange={this.handleChange} autoComplete="nome"/>
          </FormGroup>
          <FormGroup>
            <Label for="preco">Preço</Label>
            <Input type="text" name="preco" id="preco" value={item.preco || ''}
                   onChange={this.handleChange} autoComplete="preco"/>
          </FormGroup>          
          <FormGroup>
            <Label for="descricao">Descrição</Label>
            <Input type="text" name="descricao" id="descricao" value={item.descricao || ''}
                   onChange={this.handleChange} autoComplete="descricao"/>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Salvar</Button>{' '}
            <Button color="secondary" tag={Link} to="/produtos">Cancelar</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(ProdutoEdit);