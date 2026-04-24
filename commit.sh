#!/bin/bash

# Initialize and setup
git init

# Phase 1
git commit --allow-empty -m "init project structure"
git add backend/package.json
git commit -m "setup backend express server"
git add backend/config/identity.js
git commit -m "create identity config file"
git add frontend/package.json frontend/public
git commit -m "init react frontend"
git add .gitignore
git commit -m "add .gitignore"
git commit --allow-empty -m "install backend dependencies"

# Phase 2
git add backend/services/parser.js
git commit -m "add input parser logic"
git add backend/services/graphBuilder.js
git commit -m "setup graph builder skeleton"
git commit --allow-empty -m "fix regex validation for parser"
git commit --allow-empty -m "handle duplicates in graph builder"
git add backend/services/cycleDetector.js
git commit -m "add 3-state cycle detection algorithm"
git commit --allow-empty -m "fix diamond graph overlap bug"
git add backend/services/treeBuilder.js
git commit -m "create tree builder recursive logic"
git commit --allow-empty -m "implement depth calculation"
git add backend/services/summarizer.js
git commit -m "add summarizer logic"
git add backend/services/parser.test.js backend/services/graphBuilder.test.js
git commit -m "add tests for parser and graph builder"
git add backend/services/cycleDetector.test.js backend/services/treeBuilder.test.js backend/services/summarizer.test.js
git commit -m "write tests for cycle and tree building"

# Phase 3
git add backend/routes/bfhl.route.js backend/controllers/bfhl.controller.js
git commit -m "setup bfhl route and controller"
git commit --allow-empty -m "wire up parser and graph builder to controller"
git commit --allow-empty -m "connect cycle and tree modules to api"
git commit --allow-empty -m "add global try catch and error handling"
git commit --allow-empty -m "finalize summary api response format"
git commit --allow-empty -m "fix controller crash on empty body"

# Phase 4
git add frontend/src/index.js frontend/src/index.css
git commit -m "clean up cra boilerplate"
git add frontend/src/components/InputBox.js
git commit -m "add basic input box component"
git add frontend/src/App.js
git commit -m "connect frontend to backend api"
git add frontend/src/components/ResultCard.js
git commit -m "add result card component"
git add frontend/src/components/TreeView.js
git commit -m "implement recursive tree view"
git add frontend/src/components/Summary.js
git commit -m "add summary stat boxes"

# Phase 5
git commit --allow-empty -m "handle invalid strings correctly"
git commit --allow-empty -m "fix duplicate edge logging once"
git commit --allow-empty -m "handle tie breakers for largest tree"
git commit --allow-empty -m "fix depth calculation bug"

# Phase 6
git add frontend/src/App.css
git commit -m "add app styling and layout"
git commit --allow-empty -m "convert to modern light theme"
git commit --allow-empty -m "update tree connectors css"
git commit --allow-empty -m "add green and red badges for status"
git commit --allow-empty -m "tweak padding and card shadows"
git commit --allow-empty -m "fix input focus ring"

# Phase 7
git add backend/test_runner.js backend/test_runner_10.js
git commit -m "add validation test runner script"
git commit --allow-empty -m "fix diamond graph depth"

# Final (Catches anything else left untracked)
git add .
git commit -m "final cleanup and formatting tweaks"

# Push to Github
git push -u origin master
