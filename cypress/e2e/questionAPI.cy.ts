describe("tests questions connection, and button existence", () => {
  it("should find a button with class 'btn-test'", () => {
    // Visit the page where the button should be located
    cy.visit("http://127.0.0.1:3001");
    cy.get(".btn-test").should("exist");
    cy.get(".btn-test").should("be.visible");
  });
});
it("GET req returns w/ a status code of 200 and has 10 questions", () => {
  cy.request({
    url: "http://127.0.0.1:3001/api/questions/random",
    method: "GET",
  }).then((resp) => {
    expect(resp.status).to.equal(200);
    expect(resp.body).to.have.length(10);
  });
});
