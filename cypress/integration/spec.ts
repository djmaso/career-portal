describe('Job List', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.get('novo-list>div.job-card').each(($el, index, $list) => {
      expect($list.length).greaterThan(5);
    })
  })
  it('Filter Categories', () => {
    cy.intercept({
      hostname: 'public-rest91.bullhornstaffing.com',
      method: 'GET',
      pathname: '/rest-services/1VCNF4/query/JobBoardPost',
      query: {
        fields: 'publishedCategory(id,name),count(id)',
        orderBy: 'publishedCategory.name',
        count: '500'
      }
    }).as('getCategories');
    cy.visit('/');
    cy.wait('@getCategories', {timeout: 30000});

    cy.get('app-sidebar [data-automation-id="category"] novo-check-list>div.check-box-group').each(($el, index, $list) => {
      if (index < 10) {
        const automationId = $el.attr('data-automation-id');
        expect(!!automationId).eq(true, 'empty category in list of categories');

        cy.intercept({
          hostname: 'public-rest91.bullhornstaffing.com',
          method: 'GET',
          pathname: '/rest-services/1VCNF4/search/JobOrder',
          query: {
            fields: 'id,title,publishedCategory(id,name),address(city,state,zip),employmentType,dateLastPublished,publicDescription,isOpen,isPublic,isDeleted,publishedZip,salary,salaryUnit',
            count: '30',
          }
        }).as('getJobs');

        cy.get(`[data-automation-id="${automationId}"]`).first().click();
        cy.wait('@getCategories', {timeout: 30000});
        cy.wait('@getJobs', {timeout: 30000});
        cy.get('novo-list>div.job-card').each(($jobEl, jobIndex, $jobList) => {
          const categoryCountRegex = /\(([^)]+)\)/;
          const count = parseInt(categoryCountRegex.exec(automationId)[1]);
          expect($jobList.length, 'The correct number of results for the specified category is not showing').equals(count);
          cy.get('span.category').should('include.text', automationId.replace(` (${count})`, ''));
        });
        cy.get('.bhi-checkbox-filled').click();
        cy.wait('@getCategories', {timeout: 30000});
        cy.wait(3000);
      } else {
        return false;
      }
    })
  })
  it('Filter States', () => {
    cy.visit('/');
    cy.get('novo-list>div.job-card').each(($el, index, $list) => {
      expect($list.length).greaterThan(5);
    })
  })
  it('Filter Cities', () => {
    cy.visit('/');
    cy.get('novo-list>div.job-card').each(($el, index, $list) => {
      expect($list.length).greaterThan(5);
    })
  })
})
