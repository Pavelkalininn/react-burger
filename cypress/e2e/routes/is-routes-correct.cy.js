
describe('app works correctly with routes', function() {
    this.beforeEach(function() {
      cy.visit('http://localhost:3000');
    });
  
    it('should open main page by default', function() {
      cy.contains('Соберите бургер');
    });
  
    it('should not open order page on click without ingredients', function() {
        cy.get('button').contains('Оформить заказ').should('be.disabled');
        cy.contains('Соберите бургер');
    });
    
    it("Burger ingredient popup close by Escape mosedown", () => {
        cy.get('[class^=style_card__]').first().as('firstIngredientCard')
        cy.get('@firstIngredientCard').click()
        cy.contains("Детали ингредиента")
        cy.get('body').trigger('keydown', { key: 'Escape'});
        cy.contains("Детали ингредиента").should('not.exist')
      });

      
    it("Burger ingredient popup close click on background", () => {
        cy.get('[class^=style_card__]').first().as('firstIngredientCard')
        cy.get('@firstIngredientCard').click()
        cy.contains("Детали ингредиента")
        cy.get('[class^=style_modal__]').click('topRight', {force: true});
        cy.contains("Детали ингредиента").should('not.exist')
      });


    it("Drag & Drop and order fetch", () => {
      const dataTransfer = new DataTransfer;
        cy.get('[class^=style_card__]').first().as('firstIngredientCard')

        cy.get('[class^=style_card__]').last().as('secondIngredientCard')
        cy.get('[class^=style_constructor__]').as('constructor')

        cy.get('@firstIngredientCard')
          .trigger('dragstart', { dataTransfer });
  
        cy.get('@constructor')
          .trigger('drop', { dataTransfer })
          .wait(3000);

        cy.get('@secondIngredientCard')
        .trigger('dragstart', { dataTransfer });
  
        cy.get('@constructor')
          .trigger('drop', { dataTransfer })
          .wait(3000);

        cy.get('button').contains('Оформить заказ').should('not.be.disabled');

        cy.get('button').contains('Оформить заказ').click();
        cy.contains('Вход');

        cy.get('input[name="email"]').click().type('mono-gluk@ya.ru')
        cy.get('input[name="password"]').click().type('Guguruge')
        cy.get('button').should('not.be.disabled')
        cy.get('button').click()
        cy.get('button').contains('Оформить заказ').click();
        cy.contains('идентификатор заказа').should('not.exist')
        cy.wait(18000);
        cy.contains('идентификатор заказа')

        cy.get('[class^=style_right__]').last().click()
        cy.get('[class^=constructor-element]').should('not.exist')
    });  
  }); 