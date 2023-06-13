const fs = require("fs-extra");
const execAsync = require("./helpers/execAsync");

const projectName = "admin_addconfig_test";

beforeAll(async () => {
  await execAsync(`npx ./ scaffold ${projectName}`);
  process.chdir(`${projectName}`);
  await execAsync(`npx ../ addconfig posts`);
}, 50_000);

afterAll(async () => {
  process.chdir("..");
  await execAsync(`rm -rf ${projectName}`);
});

test.concurrent(
  "Creating new config file",
  async () => {
    const checks = [
      fs.existsSync(`webapp`),
      fs.existsSync(`server`),
      fs.existsSync(`kitconfig`),
      fs.existsSync(`kitconfig/resources/posts.cjs`),
    ];

    expect(checks.filter((dirCheck) => !dirCheck).length).toBe(0);
  },
  50_000,
);
