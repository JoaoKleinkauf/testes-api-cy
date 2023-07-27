/// <reference types="cypress" />

describe('Testes da Funcionalidade Usuários', () => {
     let token
     before(() => {
          cy.token('beltrano@qa.com.br', 'teste').then(tkn => { token = tkn })
      });

     it('Deve validar contrato de usuários', () => {

     });

     it('Deve listar usuários cadastrados', () => {
          cy.request({
               method: 'GET',
               url: 'http://localhost:3000/usuarios',
          }).then((response) => {
               expect(response.status).to.equal(200)
               expect(response.body).to.have.property('usuarios')
               expect(response.duration).to.be.lessThan(20)
          })
     });

     it('Deve cadastrar um usuário com sucesso', () => {
          let email = `joaopedro` + `${Math.floor(Math.random() * 100000000)}` + `@gmail.com`
          let pass = `${Math.floor(Math.random() * 100000000)}`
          let nome = `joao pedro${Math.floor(Math.random() * 100000000)}`

          cy.request({
               method: 'POST',
               url: 'http://localhost:3000/usuarios',
               body: {
                    "nome": nome,
                    "email": email,
                    "password": pass,
                    "administrador": "true"
               },
          }).then((response) => {
               expect(response.status).to.equal(201)
               expect(response.body.message).to.equal('Cadastro realizado com sucesso')
          });
     });

     it('Deve validar um usuário com email inválido', () => {
          let email = `joaopedro` + `${Math.floor(Math.random() * 100000000)}` + `#gmail.com`
          let pass = `${Math.floor(Math.random() * 100000000)}`
          let nome = `joao pedro${Math.floor(Math.random() * 100000000)}`
          
          cy.request({
               method: 'POST',
               url: 'http://localhost:3000/usuarios',
               body: {
                    "nome": nome,
                    "email": email,
                    "password": pass,
                    "administrador": "true"
               },
               failOnStatusCode: false
          }).then((response) => {
               expect(response.status).to.equal(400)
               expect(response.body.message).to.equal('email deve ser um email válido')
          });
     });

     it('Deve editar um usuário previamente cadastrado', () => {
          let email = `joaopedro` + `${Math.floor(Math.random() * 100000000)}` + `@gmail.com`
          cy.request('http://localhost:3000/usuarios').then(response =>{
               let id = response.body.usuarios[0]._id
               cy.request({
                    method: 'PUT',
                    url: `http://localhost:3000/usuarios/${id}` ,
                    headers: {authorization: token},
                    body: 
                         {
                         "nome": "joao pedro3402173",
                         "email": email,
                         "password": "teste",
                         "administrador": "true"
                         }
               }).then(response => {
                    expect(response.status).to.equal(200)
                    expect(response.body.message).to.equal('Registro alterado com sucesso')
               })
          })
     });

     it('Deve deletar um usuário previamente cadastrado', () => {
          let nome = `joao pedro${Math.floor(Math.random() * 100000000)}`
          cy.cadastrarProduto(token, nome, 'qaa@gmail.com', 'teste')
          .then(response => {
               let id = response.body._id
               cy.request({
                   method: 'DELETE',
                   url: `http://localhost:3000/usuarios/${id}`,
                   headers: {authorization: token}
               }).then(response =>{
                   expect(response.body.message).to.equal('Registro excluído com sucesso')
                   expect(response.status).to.equal(200)
               })
          });
     });
});

