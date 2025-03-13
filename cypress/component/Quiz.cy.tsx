import Quiz from "../../client/src/components/Quiz";

describe("Quiz Component", () => {
  beforeEach(() => {
    // Stub the API call to return mock questions
    cy.intercept("GET", "/api/questions/random", {
      statusCode: 200,
      body: [
        {
          _id: "1",
          question: "What is the output of print(2 ** 3)?",
          answers: [
            { text: "6", isCorrect: false },
            { text: "8", isCorrect: true },
            { text: "9", isCorrect: false },
            { text: "12", isCorrect: false },
          ],
        },
      ],
    }).as("getQuestions");

    // Mount the component
    cy.mount(<Quiz />);
  });

  it("should display start button", () => {
    cy.get(".btn-test")
      .should("exist")
      .and("be.visible")
      .and("contain", "Start Quiz");
  });

  it("should start quiz when button is clicked", () => {
    cy.get(".btn-test").click();
    cy.wait("@getQuestions");

    // Verify question is displayed
    cy.contains("What is the output of print(2 ** 3)?").should("be.visible");

    // Verify answers are displayed
    cy.contains("6").should("be.visible");
    cy.contains("8").should("be.visible");
    cy.contains("9").should("be.visible");
    cy.contains("12").should("be.visible");
  });
});
