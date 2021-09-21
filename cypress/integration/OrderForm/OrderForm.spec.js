describe('renders each question', () => {
  before(() => {
    cy.visit('http://localhost:3000');
  });

  it('opens first question page', () => {
    cy.get('h1').invoke('text').should('match', /What is your name/i);
    cy.get('h1').should('not.have.text', 'What is your email address?');
    cy.get('button').should('not.have.text', '< Back');
  });

  it('enters name and check validation', () => {
    cy.contains('Next >').click();
    cy.get('.error').should('have.text', 'Required');

    cy.get('.customer-name').type('f')
      .blur();
    cy.get('.error').should('have.text', 'Name is too Short!');
    cy.get('.customer-name').clear();

    cy.get('.customer-name').type('fl3@£')
      .blur();
    cy.get('.error').should('have.text', 'Please enter valid name');
    cy.get('.customer-name').clear();

    cy.get('.customer-name').type('florence')
      .blur().should('have.value', 'florence');
    cy.contains('Next >').click();
  });

  it('opens second question page', () => {
    cy.get('h1').invoke('text').should('match', /What is your email address/i);
    cy.get('h1').should('not.have.text', 'What is your name?');
    cy.get('button:first').should('have.text', '< Back');
  });

  it('enters email and check validation', () => {
    cy.contains('Next >').click();
    cy.get('.error').should('have.text', 'Required');

    cy.get('.customer-email').type('flo.com')
      .blur();
    cy.get('.error').should('have.text', 'Please enter valid email address');
    cy.get('.customer-email').clear();

    cy.get('.customer-email')
      .type('test@email.com').blur().should('have.value', 'test@email.com');
    cy.contains('Next >').click();
  });

  it('opens third question page', () => {
    cy.get('h1').invoke('text').should('match', /What service/i);
    cy.get('button:first').should('have.text', '< Back');
    cy.get('h1').should('not.have.text', 'What is your name?');
    cy.get('h1').should('not.have.text', 'What is your email address?');
  });
  it('chooses service', () => {
    cy.contains('Next >').click();
    cy.get('.error').should('have.text', 'Choose one');

    cy.get('.select [type="radio"]')
      .check('STI Testing', { force: true }).should('be.checked');
    cy.contains('Next >').click();
  });

  it('opens Preview page', () => {
    cy.get('h3').invoke('text').should('match', /confirm/i);
    cy.get('button:first').should('have.text', '< Back');
    cy.contains('Confirm').click();
  });

  it('opens confirmation page', () => {
    cy.get('h1').invoke('text').should('match', /submitted/i);
    cy.get('h1').should('not.have.text', 'What is your name?');
    cy.get('h1').should('not.have.text', 'What is your email address?');
    cy.get('h1').should('not.have.text', 'What service are you here for?');
  });
});

describe('able to go backward and amend the previous user entry', () => {
  before(() => {
    cy.visit('http://localhost:3000');
  });

  it('answers first question', () => {
    cy.get('.customer-name').type('florence')
      .blur().should('have.value', 'florence');
    cy.contains('Next >').click();
  });

  it('next to second question and back to first question', () => {
    cy.get('.customer-email').type('flo@email.com')
      .blur();
    cy.contains('< Back').click();
  });

  it('back to first question and should have previous value', () => {
    cy.get('.customer-name')
      .should('have.value', 'florence')
      .clear();

    cy.get('.customer-name').type('flo')
      .blur();
    cy.contains('Next >').click();
  });

  it('next to second question and should have previous value', () => {
    cy.get('.customer-email')
      .should('have.value', 'flo@email.com')
      .clear();

    cy.get('.customer-email').type('florence@email.com')
      .blur();
    cy.contains('Next >').click();
  });

  it('go to third question and should be able to go back', () => {
    cy.get('.select [type="radio"]')
      .check('STI Testing', { force: true }).should('be.checked');
    cy.contains('< Back').click();

    cy.get('h1').should('have.text', 'What is your email address?');
    cy.get('.customer-email')
      .should('have.value', 'florence@email.com');
    cy.contains('Next >').click();
    cy.contains('Next >').click();
  });

  it('go to preview page and should be able to go back', () => {
    cy.get('h3').invoke('text').should('match', /confirm/i);
    cy.get('li')
      .should('have.length', 3);
    cy.contains('< Back').click();

    cy.get('h1').should('have.text', 'What service are you here for?');
    cy.get('.select [type="radio"]')
      .check('Other', { force: true }).should('be.checked');
    cy.contains('Next >').click();
    cy.contains('Confirm').click();
  });
});
