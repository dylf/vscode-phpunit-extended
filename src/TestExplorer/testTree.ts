import * as vscode from 'vscode';
import { parsePHP } from './parser';
import PhpUnitTestRunner from './phpUnitTestRunner';

export type phpTestData = TestFile | TestClass | TestCase;

export const testData = new WeakMap<vscode.TestItem, phpTestData>();

let generationCounter = 0;

export class TestFile {
  public didResolve = false;

  /**
   * Parses the tests from the input text, and updates the tests contained
   * by this file to be those from the text,
   */
  public updateFromContents(controller: vscode.TestController, content: string, item: vscode.TestItem) {
    const ancestors = [{ item, children: [] as vscode.TestItem[] }];
    const thisGeneration = generationCounter++;
    this.didResolve = true;

    let config = vscode.workspace.getConfiguration("phpunit");
    let args = [].concat(config.get<Array<string>>("args", []));

    const ascend = (depth: number) => {
      while (ancestors.length > depth) {
        const finished = ancestors.pop()!;
        finished.item.children.replace(finished.children);
      }
    };

    parsePHP(content, {
      onTest: (range: vscode.Range, name: string) => {
        const parent = ancestors[ancestors.length - 1];
        const data = new TestCase(name, args, thisGeneration);
        const id = `${item.uri}/${name}`;

        const testCase = controller.createTestItem(id, name, item.uri);
        testData.set(testCase, data);
        testCase.range = range;
        parent.children.push(testCase);
      },

      onClass: (range: vscode.Range, name: string) => {
        ascend(1);
        const parent = ancestors[ancestors.length - 1];
        const id = `${item.uri}/${name}`;

        const testClass = controller.createTestItem(id, name, item.uri);
        testClass.range = range;
        testData.set(testClass, new TestClass(thisGeneration));
        parent.children.push(testClass);
        ancestors.push({ item: testClass, children: [] });
      },
    });

    ascend(0); // finish and assign children for all remaining items
  }
}

export class TestClass {
  constructor(public generation: number) { }
}
export class TestCase {
  constructor(
    private readonly currentTest: string,
    private readonly args: string[],
    public generation: number
  ) { };

  async run(item: vscode.TestItem, options: vscode.TestRun) {
    const start = Date.now();

    if (this.currentTest) {
      this.args.push("--filter");
      this.args.push(this.currentTest);

      // this.phpUnit = new PhpUnitTestRunner(this.outputChannel, this.args);
      let phpUnit = new PhpUnitTestRunner(this.args);
      let testSuccess = phpUnit.run();
      const duration = Date.now() - start;

      if (testSuccess) {
        options.passed(item, duration);
      } else {
        const message = new vscode.TestMessage(`${item.label} Failed`);
        message.location = new vscode.Location(item.uri!, item.range!);
        options.failed(item, message, duration);
      }
    } else {
      const message = new vscode.TestMessage(`${item.label} not found`);
      options.failed(item, message);
    }
  }
}
