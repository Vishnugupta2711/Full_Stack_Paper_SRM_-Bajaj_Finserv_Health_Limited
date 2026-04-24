const { bfhlHandler } = require("./controllers/bfhl.controller");

// Mock Express req/res
const mockReq = (data) => ({ body: { data } });
const mockRes = () => {
  const res = {};
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (data) => {
    res.data = data;
    return res;
  };
  return res;
};

const testCases = [
  {
    name: "1. Basic Tree",
    data: ["A->B", "B->C", "C->D"]
  },
  {
    name: "2. Multiple Trees",
    data: ["A->B", "B->C", "X->Y"]
  },
  {
    name: "3. Pure Cycle",
    data: ["X->Y", "Y->Z", "Z->X"]
  },
  {
    name: "4. Diamond Case",
    data: ["A->D", "B->D"]
  },
  {
    name: "5. Duplicate Edges",
    data: ["A->B", "A->B", "A->B"]
  },
  {
    name: "6. Invalid Inputs",
    data: ["hello", "1->2", "A->", "A-B", "AB->C", ""]
  },
  {
    name: "7. Self Loop",
    data: ["A->A"]
  },
  {
    name: "8. Mixed Full Case",
    data: [
      "A->B", "A->C", "B->D", "C->E", "E->F",
      "X->Y", "Y->Z", "Z->X",
      "P->Q", "Q->R",
      "G->H", "G->H", "G->I",
      "hello", "1->2", "A->"
    ]
  }
];

function runTests() {
  console.log("=== RUNNING VALIDATION TESTS ===\n");
  for (const tc of testCases) {
    const req = mockReq(tc.data);
    const res = mockRes();
    
    try {
      bfhlHandler(req, res);
      console.log(`\n--- TEST: ${tc.name} ---`);
      console.log(`Input:`, JSON.stringify(tc.data));
      console.log(`Status:`, res.statusCode || 200);
      console.log(`Output:`, JSON.stringify(res.data, null, 2));
    } catch (e) {
      console.error(`\n--- TEST: ${tc.name} ---`);
      console.error(`FAILED with error:`, e.message);
    }
  }
}

runTests();
