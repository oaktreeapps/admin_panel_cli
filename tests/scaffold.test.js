const execAsync = require("./helpers/execAsync");
const fs = require("fs-extra")

afterAll(async () => {
    await execAsync("rm -rf admin");
    await execAsync("rm -rf admin_server");
    await execAsync("rm -rf admin_webapp");
}, 10_000);

test.concurrent('Creating a new template (default)', async () => {
    const projectName = "admin"

    await execAsync(`npx ./ scaffold ${projectName}`);

    const checks = [
        fs.existsSync(projectName),
        fs.existsSync(`${projectName}/webapp`),
        fs.existsSync(`${projectName}/server`),
        fs.existsSync(`${projectName}/kitconfig`)
    ]

    expect(checks.filter(dirCheck => !dirCheck).length).toBe(0);
}, 50_000);

test.concurrent(
    'Creating a new template (--only-webapp)',
    async () => {
        const projectName = "admin_webapp"

        await execAsync(`npx ./ scaffold ${projectName} --only-webapp`);

        const checks = [
            fs.existsSync(projectName),
            fs.existsSync(`${projectName}/webapp`),
            fs.existsSync(`${projectName}/kitconfig`)
        ]

        expect(checks.filter(dirCheck => !dirCheck).length).toBe(0);
    },
    50_000
)
test.concurrent(
    'Creating a new template with a custom template',
    async () => {
        const projectName = "admin_server"

        await execAsync(`npx ./ scaffold ${projectName} --only-server`);

        const checks = [
            fs.existsSync(projectName),
            fs.existsSync(`${projectName}/server`),
            fs.existsSync(`${projectName}/kitconfig`)
        ]

        expect(checks.filter(dirCheck => !dirCheck).length).toBe(0);
    },
    50_000
)