import * as fs from "fs";
const gadify_mockdata = {
  projectTitle: "Gender Equality Assessment Project",
  table: [
    {
      element:
        "1.0 Involvement of women and men (max score: 2; 1 for each item)",
      done: { no: false, partly: true, yes: false },
      score: 0.5,
      comments: "Partial participation observed in stakeholder meetings.",
      isMainSection: true,
    },
    {
      element:
        "1.1 Participation of women and men in beneficiary groups in problem identification (possible scores: 0, 0.5, 1.0)",
      done: { no: false, partly: true, yes: false },
      score: 0.5,
      comments: "Partial participation observed in stakeholder meetings.",
      isMainSection: false,
    },
    {
      element:
        "1.2 Participation of women and men in beneficiary groups in project design (possible scores: 0, 0.5, 1.0)",
      done: { no: false, partly: false, yes: true },
      score: 2.0,
      comments: "All necessary gender-based data collected.",
      isMainSection: false,
    },
    {
      element:
        "2.0 Collection of sex-disaggregated data and gender-related information (possible scores: 0, 1.0, 2.0)",
      done: { no: true, partly: false, yes: false },
      score: 0,
      comments: "No gender analysis conducted.",
      isMainSection: true,
    },
    {
      element:
        "3.0 Conduct of gender analysis and identification of gender issues (max score: 2; 1 for each item)",
      done: { no: false, partly: true, yes: false },
      score: 1.0,
      comments:
        "Some gender equality goals identified, but not fully developed.",
      isMainSection: true,
    },
    {
      element:
        "3.1 Analysis of gender gaps and inequalities related to gender roles,  perspectives and needs, or access to and control of resources (possible scores: 0, 0.5, 1.0)",
      done: { no: false, partly: false, yes: true },
      score: 2.0,
      comments: "Strategies fully aligned with identified gender issues.",
      isMainSection: false,
    },
    {
      element:
        "3.2 Analysis of constraints and opportunities related to women and men’s participation in the project (possible scores: 0, 0.5, 1.0)",
      done: { no: false, partly: true, yes: false },
      score: 1.0,
      comments: "Potential impacts identified but require further study.",
      isMainSection: false,
    },
    {
      element:
        "4.0 Gender equality goals, outcomes, and outputs (possible scores: 0, 1.0, 2.0) - Does the project have clearly stated gender equality goals, objectives, outcomes, or outputs?",
      done: { no: false, partly: false, yes: true },
      score: 2.0,
      comments: "Clear gender-focused targets included in the M&E framework.",
      isMainSection: true,
    },
    {
      element:
        "5.0 Matching of strategies with gender issues (possible scores: 0, 1.0, 2.0) - Do the strategies and activities match the gender issues and gender equality goals identified?",
      done: { no: true, partly: false, yes: false },
      score: 0,
      comments: "No explicit requirement for sex-disaggregated data in M&E.",
      isMainSection: true,
    },
    {
      element:
        "6.0 Gender analysis of likely impacts of the project (max score: 2; for each item or question, 0.67)",
      done: { no: false, partly: true, yes: false },
      score: 1.0,
      comments: "Limited budget allocated for gender-related efforts.",
      isMainSection: true,
    },
    {
      element:
        "6.1 Are women and girl children among the direct or indirect beneficiaries? (Possible scores: 0, 0.33, 0.67)",
      done: { no: false, partly: false, yes: true },
      score: 2.0,
      comments: "Strong alignment with agency’s gender-related initiatives.",
      isMainSection: false,
    },
    {
      element:
        "6.2 Has the project considered its long-term impact on women’s socioeconomic status and empowerment? (Possible scores: 0, 0.33, 0.67)",
      done: { no: false, partly: false, yes: true },
      score: 2.0,
      comments: "Strong alignment with agency’s gender-related initiatives.",
      isMainSection: false,
    },
    {
      element:
        "6.3 Has the project included strategies for avoiding or minimizing negative impact on women’s status and welfare? (Possible scores: 0, 0.33, 0.67)",
      done: { no: false, partly: false, yes: true },
      score: 2.0,
      comments: "Strong alignment with agency’s gender-related initiatives.",
      isMainSection: false,
    },
    {
      element:
        "7.0 Monitoring targets and indicators (possible scores: 0, 1.0, 2.0)",
      done: { no: false, partly: false, yes: true },
      score: 2.0,
      comments: "Strong alignment with agency’s gender-related initiatives.",
      isMainSection: true,
    },
    {
      element:
        "8.0 Sex-disaggregated database requirement (possible scores: 0, 1.0, 2.0)",
      done: { no: false, partly: false, yes: true },
      score: 2.0,
      comments: "Strong alignment with agency’s gender-related initiatives.",
      isMainSection: true,
    },
    {
      element: "9.0 Resources (max score: 2; for each question, 1)",
      done: { no: false, partly: false, yes: true },
      score: 2.0,
      comments: "Strong alignment with agency’s gender-related initiatives.",
      isMainSection: true,
    },
    {
      element:
        "9.1 Is the project’s budget allotment sufficient for gender equality promotion or integration? OR will the project tap counterpart funds from LGUs/partners for its GAD efforts? (Possible scores: 0, 0.5, 1.0)",
      done: { no: false, partly: false, yes: true },
      score: 2.0,
      comments: "Strong alignment with agency’s gender-related initiatives.",
      isMainSection: false,
    },
    {
      element:
        "9.2 Does the project have the expertise in promoting gender equality and women’s empowerment? OR does the project commit itself to investing project staff time in building capacities within the project to integrate GAD or promote gender equality? (Possible scores: 0, 0.5, 1.0)",
      done: { no: false, partly: false, yes: true },
      score: 2.0,
      comments: "Strong alignment with agency’s gender-related initiatives.",
      isMainSection: false,
    },
    {
      element:
        "10.0 Relationship with the agency’s GAD efforts (max score: 2; for each question or item, 0.67",
      done: { no: false, partly: false, yes: true },
      score: 2.0,
      comments: "Strong alignment with agency’s gender-related initiatives.",
      isMainSection: true,
    },
    {
      element:
        "10.1 Will the project build on or strengthen the agency/ NCRFW/ government’s commitment to the empowerment of women? (Possible scores: 0, 0.33, 0.67) IF THE AGENCY HAS NO GAD PLAN: Will the project help in the formulation of the implementing agency’s GAD plan?",
      done: { no: false, partly: false, yes: true },
      score: 2.0,
      comments: "Strong alignment with agency’s gender-related initiatives.",
      isMainSection: false,
    },
    {
      element:
        "10.2 Will the project build on the initiatives or actions of other organizations in the area? (Possible scores: 0, 0.33, 0.67)",
      done: { no: false, partly: false, yes: true },
      score: 2.0,
      comments: "Strong alignment with agency’s gender-related initiatives.",
      isMainSection: false,
    },
    {
      element:
        "10.3 Does the project have an exit plan that will ensure the sustainability of GAD efforts and benefits? (Possible scores: 0, 0.33, 0.67)",
      done: { no: false, partly: false, yes: true },
      score: 2.0,
      comments: "Strong alignment with agency’s gender-related initiatives.",
      isMainSection: false,
    },
  ],
};

export default gadify_mockdata;
