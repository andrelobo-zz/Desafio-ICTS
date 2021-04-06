import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class CompraEdit extends Component {

  emptyCompra = {
    total: '',
    tipo_pagamento: '',
    status: ''
    
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyCompra
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const compra = await (await fetch(`/api/compra/${this.props.match.params.id}`)).json();
      this.setState({item: compra});
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

    await fetch('/api/compra', {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/compras');
  }

  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Edite compra' : 'Adicione uma compra'}</h2>;

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="total">Total</Label>
            <Input type="text" name="total" id="nome" value={item.total || ''}
                   onChange={this.handleChange} autoComplete="nome"/>
          </FormGroup>
          <FormGroup>
            <Label for="preco">Tipo de Pagamento</Label>
            <Input type="text" name="tipo_pagamento" id="tipo_pagamento" value={item.tipo_pagamento || ''}
                   onChange={this.handleChange} autoComplete="tipo_pagamento"/>
          </FormGroup>          
          <FormGroup>
            <Label for="descricao">Status</Label>
            <Input type="text" name="status" id="status" value={item.status || ''}
                   onChange={this.handleChange} autoComplete="status"/>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Salvar</Button>{' '}
            <Button color="secondary" tag={Link} to="/compras">Cancelar</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(CompraEdit);