const fs = require('fs');

const ENV = {
    LOCAL: 'local',
    // DEVELOPMENT: 'development',
    // PRODUCTION: 'production'
}

const envs = Object.values(ENV);
console.log("\033[92mCurrent ENV:", process.env.NODE_ENV);

const updateEnv = async () => {
    try {
        for (const e of envs) {
            const data = await readFile(`.env.${e}.example`);
            if (await checkFileIfExist(`.env.${e}`)) {
                await overwriteFile(`.env.${e}`, data);
            } else {
                await createFile(`.env.${e}`);
                await overwriteFile(`.env.${e}`, data);
            }
        }
    } catch (error) {
        throw new Error(error);
    }
};

const readFile = async (file) => {
    const data = await fs.promises.readFile(file, 'utf8');
    return data;
};

const overwriteFile = async (file, content) => {
    try {
        await fs.promises.writeFile(file, content, 'utf8');
        console.log("\033[33mFile " + file + " has been overwritten.");
    } catch (error) {
        throw new Error(error);
    }
};

const checkFileIfExist = async (file) =>
    new Promise((resolve, reject) => {
        fs.access(file, fs.constants.F_OK, (err) => {
            if (err) resolve(false);
            resolve(true);
        });
    });

const createFile = async (file) =>
    new Promise((resolve, reject) => {
        const dataString = JSON.stringify('{}', null, 2);
        fs.writeFile(file, dataString, (err) => {
            if (err) resolve(false);
            resolve(true);
        });
    });

updateEnv();
