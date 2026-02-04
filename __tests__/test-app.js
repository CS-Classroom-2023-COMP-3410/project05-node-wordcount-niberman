const {
    readFileContent,
    getWordCounts,
    colorWord,
    printColoredLines
} = require('../app.js');

const chalk = require('chalk');

describe('readFileContent', () => {
    it('should read content of declaration.txt', () => {
        const content = readFileContent();
        expect(typeof content).toBe('string');
        expect(content.length).toBeGreaterThan(0);
    });
});

describe('getWordCounts', () => {
    it('should return correct word count', () => {
        const content = "Hello World! Hello!";
        const result = getWordCounts(content);
        expect(result).toEqual({
            hello: 2,
            world: 1
        });
    });
});

describe('colorWord', () => {
    it('should color words based on frequency', () => {
        expect(colorWord("test", 1)).toBe(chalk.blue("test"));
        expect(colorWord("test", 3)).toBe(chalk.green("test"));
        expect(colorWord("test", 7)).toBe(chalk.red("test"));
    });
});

describe('printColoredLines', () => {
    let consoleOutput = [];
    const originalLog = console.log;
    
    beforeEach(() => {
        consoleOutput = [];
        console.log = (output) => consoleOutput.push(output);
    });

    afterEach(() => {
        console.log = originalLog;
    });

    it('should print colored lines', () => {
        const content = `Hello World!
Hello World!
Bye World!`;
        const wordCounts = getWordCounts(content);
        
        printColoredLines(content, wordCounts);

        expect(consoleOutput[0]).toBe(chalk.green('Hello') + ' ' + chalk.green('World') + ' ');
        expect(consoleOutput[1]).toBe(chalk.green('Hello') + ' ' + chalk.green('World') + ' ');
        expect(consoleOutput[2]).toBe(chalk.blue('Bye') + ' ' + chalk.green('World') + ' ');
    });
});
