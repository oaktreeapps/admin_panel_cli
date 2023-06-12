const fs = require("fs-extra")
const execAsync = require("./helpers/execAsync");

const projectName = "admin_add_test"

beforeAll(async () => {
    await execAsync(`npx ./ scaffold ${projectName}`)
}, 50_000)

afterAll(async () => {
    await execAsync(`rm -rf ${projectName}`);
});

test.concurrent('Creating new screens', async () => {
    process.chdir(`${projectName}`);
    await execAsync(`npx ../ add --all`);

    const checks = [
        fs.existsSync(`webapp`),
        fs.existsSync(`server`),
        fs.existsSync(`kitconfig`),
        fs.existsSync(`webapp/src/screens/Students`),
        fs.existsSync(`server/src/Microservices/Students`),
    ]

    process.chdir("..");
    console.log(checks)

    expect(checks.filter(dirCheck => !dirCheck).length).toBe(0);
}, 50_000);