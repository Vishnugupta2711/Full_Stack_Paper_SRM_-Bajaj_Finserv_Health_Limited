const { bfhlHandler } = require("./controllers/bfhl.controller");

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
    data: ["A->B", "B->C", "C->D"],
    verify: (out) => out.summary.total_trees === 1 && out.summary.total_cycles === 0 && out.summary.largest_tree_root === "A" && out.hierarchies[0].depth === 4
  },
  {
    name: "2. Multiple Trees",
    data: ["A->B", "B->C", "X->Y"],
    verify: (out) => out.summary.total_trees === 2 && out.hierarchies.map(h => h.root).join(",") === "A,X"
  },
  {
    name: "3. Pure Cycle",
    data: ["X->Y", "Y->Z", "Z->X"],
    verify: (out) => out.summary.total_trees === 0 && out.summary.total_cycles === 1 && out.hierarchies[0].has_cycle === true && !("depth" in out.hierarchies[0])
  },
  {
    name: "4. Diamond Case",
    data: ["A->D", "B->D"],
    verify: (out) => {
      const aTree = out.hierarchies.find(h => h.root === "A");
      const bTree = out.hierarchies.find(h => h.root === "B");
      return out.summary.total_trees === 2 &&
             aTree && aTree.depth === 2 &&
             bTree && bTree.depth === 1 &&
             out.duplicate_edges.length === 0 &&
             out.invalid_entries.length === 0;
    }
  },
  {
    name: "5. Duplicate Edges",
    data: ["A->B", "A->B", "A->B"],
    verify: (out) => out.duplicate_edges.length === 1 && out.duplicate_edges[0] === "A->B" && out.summary.total_trees === 1
  },
  {
    name: "6. Invalid Inputs",
    data: ["hello", "1->2", "A->", "A-B", "AB->C", ""],
    verify: (out) => out.invalid_entries.length === 6 && out.summary.total_trees === 0
  },
  {
    name: "7. Self Loop",
    data: ["A->A"],
    verify: (out) => out.invalid_entries.includes("A->A")
  },
  {
    name: "8. Mixed Full Case",
    data: [
      "A->B", "A->C", "B->D", "C->E", "E->F",
      "X->Y", "Y->Z", "Z->X",
      "P->Q", "Q->R",
      "G->H", "G->H", "G->I",
      "hello", "1->2", "A->"
    ],
    verify: (out) => out.summary.total_trees === 3 && out.summary.total_cycles === 1 && out.summary.largest_tree_root === "A" && out.duplicate_edges.includes("G->H") && out.invalid_entries.length === 3
  },
  {
    name: "9. All Cycles",
    data: ["A->B", "B->A"],
    verify: (out) => out.summary.total_cycles === 1 && out.summary.total_trees === 0
  },
  {
    name: "10. Trim Handling",
    data: ["A->B  ", "   B->C"],
    verify: (out) => out.summary.total_trees === 1 && out.hierarchies[0].depth === 3
  },
  {
    name: "11. Mixed Cycle and Tree (Evaluator Trap)",
    data: ["A->B", "B->C", "C->A", "D->E"],
    verify: (out) => out.summary.total_trees === 1 && out.summary.total_cycles === 1 && out.summary.largest_tree_root === "D"
  }
];

let passed = 0;
let failed = 0;

for (const tc of testCases) {
  const req = mockReq(tc.data);
  const res = mockRes();
  
  console.log(`=== TEST ${tc.name.split('.')[0]} ===`);
  console.log(`Input: ${tc.data.join(', ')}\n`);
  
  try {
    bfhlHandler(req, res);
    console.log(`Output:`);
    console.log(JSON.stringify(res.data, null, 2));
    
    const isPass = tc.verify(res.data);
    if (isPass) {
      console.log(`\nResult: PASS ✅\n`);
      passed++;
    } else {
      console.log(`\nResult: FAIL ❌ (Verification failed)\n`);
      failed++;
    }
  } catch (e) {
    console.log(`Output:\nError: ${e.message}`);
    console.log(`\nResult: FAIL ❌\n`);
    failed++;
  }
}

console.log(`=== SUMMARY ===`);
console.log(`Total Passed: ${passed}`);
console.log(`Total Failed: ${failed}`);
