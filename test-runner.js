const { spawn } = require('child_process');
const { create } = require('junit-report-builder');

const report = create('test-results.xml');

const testProcess = spawn(
    process.execPath,
    ['--test', 'test.js'],
    {
        stdio: ['ignore', 'pipe', 'pipe']
    }
);

let output = '';

testProcess.stdout.on('data', (data) => {
    process.stdout.write(data);
    output += data.toString();
});

testProcess.stderr.on('data', (data) => {
    process.stderr.write(data);
    output += data.toString();
});

testProcess.on('close', (code) => {

    report
        .testSuite()
        .name('Node.js Unit Tests')
        .testCase()
        .className('Node.js Application')
        .name('Application Tests')
        .time(0)
        .systemOut(output);

    report.write();

    process.exit(code);
});