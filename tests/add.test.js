const fs = require("fs-extra");
const execAsync = require("./helpers/execAsync");

const projectName = "admin_add_test";

beforeAll(async () => {
  await execAsync(`npx ./ scaffold ${projectName}`);
  process.chdir(`${projectName}`);
  await execAsync(`npx ../ add --all`);
}, 50_000);

afterAll(async () => {
  process.chdir("..");
  await execAsync(`rm -rf ${projectName}`);
});

test.concurrent(
  "Creating new screens",
  async () => {
    const checks = [
      fs.existsSync(`webapp`),
      fs.existsSync(`server`),
      fs.existsSync(`kitconfig`),
      fs.existsSync(`webapp/src/screens/Students`),
      fs.existsSync(`server/src/Microservices/Students`),
    ];

    expect(checks.filter((dirCheck) => !dirCheck).length).toBe(0);
  },
  50_000,
);

test.concurrent(
  "new resource has routes, screens & types files",
  async () => {
    const checks = [
      // webapp
      fs.readdirSync(`webapp/src/screens/Students`),
      fs.readFileSync(`webapp/src/screens/Students/Students.tsx`).toString(),
      fs.readFileSync(`webapp/src/screens/Students/EditStudents.tsx`).toString(),
      fs.readFileSync(`webapp/src/screens/Students/CreateStudents.tsx`).toString(),
      fs.readFileSync(`webapp/src/types/students.d.ts`).toString(),

      // server
      fs.readdirSync(`server/src/Microservices/Students`),
      fs.readFileSync(`server/src/Microservices/Students/StudentsController.ts`).toString(),
      fs.readFileSync(`server/src/Microservices/Students/StudentsRouter.ts`).toString(),
      fs.readFileSync(`server/src/Microservices/Students/Students.dto.ts`).toString(),
    ];

    expect(checks.filter((dirCheck) => !dirCheck).length).toBe(0);

    const webappRouterFileContent = fs.readFileSync(`webapp/src/main.tsx`).toString();

    // imports checks
    expect(webappRouterFileContent).toContain(
      `import StudentsPage from "./screens/Students/Students"`,
    );
    expect(webappRouterFileContent).toContain(
      `import EditStudentsPage from "./screens/Students/EditStudents"`,
    );
    expect(webappRouterFileContent).toContain(
      `import CreateStudentsPage from "./screens/Students/CreateStudents"`,
    );
    // routes check
    expect(webappRouterFileContent).toContain(
      `<Route path="students" element={<StudentsPage />} />`,
    );
    expect(webappRouterFileContent).toContain(
      `<Route path="students/edit/:id" element={<EditStudentsPage />} />`,
    );
    expect(webappRouterFileContent).toContain(
      `<Route path="students/create" element={<CreateStudentsPage />} />`,
    );

    const serverRouterFileContent = fs
      .readFileSync(`server/src/Microservices/ApiRouter.ts`)
      .toString();

    // routes check
    expect(serverRouterFileContent).toContain(`ApiRouter.use("/students", StudentsRouter)`);
    // imports check
    expect(serverRouterFileContent).toContain(
      `import { StudentsRouter } from "./Students/StudentsRouter"`,
    );
  },
  50_000,
);
