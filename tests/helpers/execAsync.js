const { exec } = require("child_process");

async function execAsync(command) {
    return new Promise((resolve, _) => {
        exec(command, () => {
            resolve(null);
        });
    });
}

module.exports = execAsync;