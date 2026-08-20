const test=require("node:test");const assert=require("node:assert/strict");
test("application configuration is valid",()=>{const p=require("./package.json");assert.equal(p.name,"jenkins-nodejs-cicd-app");assert.ok(p.dependencies.express);assert.ok(p.dependencies.nodemailer);});
