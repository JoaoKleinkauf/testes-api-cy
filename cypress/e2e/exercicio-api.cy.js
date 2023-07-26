/// <reference types="cypress" />

describe('Testes da Funcionalidade Usuários', () => {

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
               //TODO: 
     });

     it('Deve editar um usuário previamente cadastrado', () => {
               //TODO: 
     });

     it('Deve deletar um usuário previamente cadastrado', () => {
               //TODO: 
     });
});
