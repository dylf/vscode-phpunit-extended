# PHPUnit Extended With Test Explorer for VSCode

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=RobertOstermann.phpunit-extended-test-explorer"><img src="https://vsmarketplacebadge.apphb.com/version-short/RobertOstermann.phpunit-extended-test-explorer.svg" alt="VS Marketplace Version"></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=RobertOstermann.phpunit-extended-test-explorer"><img src="https://vsmarketplacebadge.apphb.com/installs-short/RobertOstermann.phpunit-extended-test-explorer.svg" alt="VS Marketplace Installs"></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=RobertOstermann.phpunit-extended-test-explorer"><img src="https://vsmarketplacebadge.apphb.com/rating-short/RobertOstermann.phpunit-extended-test-explorer.svg" alt="VS Marketplace Rating"></a>
</p>

![test-explorer](images/test-explorer-example.png)

## Setup

- Install [phpunit](https://phpunit.de/) or have phpunit installed through composer.
- Set the config values:

```JSON
{
    "phpunit.args": [], // Shared arguments between commandLine and testExplorer
    "phpunit.configurationPath": "path/to/phpunit.xml",
    "phpunit.execPath": "path/to/phpunit", // If this value is set to '' it will try to use the composer phpunit installation.
    "phpunit.envVars": {
        // Here you can define the environment variables to be set before executing phpunit
        "XDEBUG_CONFIG": "idekey=VSCODE"
    },
    "phpunit.commandLine.args": [
        "--testdox"
    ],
    "phpunit.commandLine.excludedGroups": [
        // Groups to be excluded when running the TestSuiteWithExclusions command
    ],
    "phpunit.commandLine.scriptsAfterTests": {
        "ok": [
            {
            "command": "some-command-with-args",
            "args": ["-status=ok"]
            },
            "another-command-without-args"
        ],
        "error": []
    },
    "phpunit.commandLine.showOutput": "always",
    "phpunit.testExplorer.fileRegex": ".*(test|tests)\\w*\\.php",
    "phpunit.testExplorer.functionRegex": "(\\/\\*.*?(@test).*?\\*\\/\\s*?)|((public\\s+){0,1}function\\s+(test\\w*))",
    "phpunit.testExplorer.multilineFunctionRegex": true,
    "phpunit.testExplorer.folderPattern": "**/{test,tests,Test,Tests}/**/*.php",
    "phpunit.testExplorer.discoverAllTests": true
}
```

## Settings

| Name                                             | Description                                                                                                                                                                                                                                                | Default                                                                       |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `phpunit.args`                                   | This is useful for setting the configuration settings shared between the command line and the test explorer.                                                                                                                                               | `{}`                                                                          |
| `phpunit.configurationPath`                      | Path to phpunit.xml configuration file (if empty it tries to use find the nearest configuration file).                                                                                                                                                     | `''`                                                                          |
| `phpunit.envVars`                                | Set environment variables before running phpunit                                                                                                                                                                                                           | `{}`                                                                          |
| `phpunit.execPath`                               | Path to phpunit executable (if empty it tries to use composer installation).                                                                                                                                                                               | `""`                                                                          |
| `phpunit.workingDirectory`                       | This determines the working directory of the process that runs the test commands. Set to `Find` to find the working directory based upon the `phpunit.xml` or `phpunit.xml.dist` path. Set to `Parent` to use the working directory of the parent process. | `"Find"`                                                                      |
| `phpunit.commandLine.args`                       | This is useful for setting the command line configuration.                                                                                                                                                                                                 | `[]`                                                                          |
| `phpunit.commandLine.excludedGroups`             | Groups to be excluded from the tests                                                                                                                                                                                                                       | `[]`                                                                          |
| `phpunit.commandLine.scriptsAfterTests`          | Scripts to execute after the tests run                                                                                                                                                                                                                     | `{ "ok": [], "error": []}`                                                    |
| `phpunit.commandLine.showOutput`                 | Show the output console after the tests run (always, error, ok).                                                                                                                                                                                           | `"always"`                                                                    |
| `phpunit.commandLine.showOutputInTerminal`       | Re-run the test and show the output within a terminal instead of an output channel. This only occurs when the conditions in `phpunit.commandLine.showOutput` are met.                                                                                      | `false`                                                                       |
| `phpunit.testExplorer.args`                      | This is useful for setting the test explorer configuration. Warning: some arguments, such as --testdox, will not allow the test explorer tests to pass.                                                                                                    | `[]`                                                                          |
| `phpunit.testExplorer.discoverAllTests`          | Determines whether to discover all tests immediately or discover them individually once opened in the editor.                                                                                                                                              | `true`                                                                        |
| `phpunit.testExplorer.fileRegex`                 | The regular expression used to determine test files.                                                                                                                                                                                                       | `".*(test\|tests)\\w\*\\.php"`                                                |
| `phpunit.testExplorer.folderPattern`             | A file glob pattern used to determine the folders to watch. Only used when discoverAllTests is set to true.                                                                                                                                                | `"**/{test,tests,Test,Tests}/**/*.php"`                                       |
| `phpunit.testExplorer.functionRegex`             | The regular expression used to determine the functions within a file to test.                                                                                                                                                                              | `(\\/\\*.*?(@test).*?\\*\\/\\s*?)\|((public\\s+){0,1}function\\s+(test\\w*))` |
| `phpunit.testExplorer.highlightFailureLocation`  | Highlight the line causing the failure in a test. You can edit the theme color with the ID `phpunit.failedTestBackground` to change the background color.                                                                                                  | `True`                                                                        |
| `phpunit.testExplorer.multilineFunctionRegex`    | Determines if the functionRegex looks at multiple lines. This is useful if the test is defined by an annotation comment.                                                                                                                                   | `true`                                                                        |
| `phpunit.testExplorer.parallelTests`             | The number of tests to run in parallel in the test explorer.                                                                                                                                                                                               | `0`                                                                           |
| `phpunit.testExplorer.showOutput`                | Show the output console after the tests run (always, error, never).                                                                                                                                                                                        | `"never"`                                                                     |
| `phpunit.testExplorer.showOutputInTerminal`      | Re-run the test and show the output within a terminal instead of an output channel. This only occurs when the conditions in `phpunit.testExplorer.showOutput` are met.                                                                                     | `false`                                                                       |
| `phpunit.testExplorer.timeout`                   | The time (seconds) to allow a test to run. The default is no timeout.                                                                                                                                                                                      | `0`                                                                           |
| `phpunit.testExplorer.verboseTestExplorerOutput` | Setting to true forces test explorer to run individual tests instead of only running the class test to get output for each test.                                                                                                                           | `false`                                                                       |

## Combined Settings

- `args` sets the arguments that are used by both the command line and the test explorer.
- `configurationPath` determines the path to the phpunit.xml configuration file.
- `execPath` determines the phpunit path.
- `envVars` allows this extension to hook into the debugger ([github.com/felixfbecker/vscode-php-debug](https://github.com/felixfbecker/vscode-php-debug)) as show in the setup section.
- `workingDirectory` allows you to set the working directory of the process that runs the phpunit command.

## Command Line Settings

- `args` allows setting hte arguments for the command line.
- `excludedGroups` excludes the given groups when running the _TestSuiteWithExclusions_ command.
- `scriptsAfterTest` runs the given scripts based upon the pass/fail status of the test.
- `showOutput` determines when to show the output console after the tests run. I would recommend leaving this as the default _always_.
- `showOutputInTerminal` re-runs the test and show the output within a terminal instead of an output channel. This only occurs when the conditions in `phpunit.commandLine.showOutput` are met.

## Test Explorer Settings

- `args` allows setting arguments for the tests. Some arguments, such as --testdox, will not allow the test explorer tests to pass.
- `discoverAllTests` allows all tests with paths that match the `folderPattern` glob AND the `fileRegex` to be added to the test explorer.
- `fileRegex` is used to determine the files to add to the test explorer.
- The file in the active editor is added based solely upon the `fileRegex`.
- `folderPattern` is only used when `discoverAllTests` is set to `true`.
- `functionRegex` sets the regex to find functions within a test file.
- `highlightFailureLocation` determines if the line responsible for the failing test should have a background highlight.
  Change the theme color using `workbench.colorCustomizations` and change the color with ID `phpunit.failedTestBackground`.
- `multilineFunctionRegex` allows the functionRegex to look at multiple lines. The functionRegex adds the `s` flag.
- `parallelTests` allows multiple tests to run concurrently. I would not recommend setting this above `8`.
- `showOutput` is similar to the command line setting of the same name. Shows the output console when specified.
- `showOutputInTerminal` re-runs the test and show the output within a terminal instead of an output channel. This only occurs when the conditions in `phpunit.testExplorer.showOutput` are met.
- `timeout` sets the time a test can run. A test that does not complete before the timeout will be cancelled.
- `verboseTestExplorerOutput` allows output to show for each test, but can take longer to run.

## How to use

### Test Explorer

Run using the `Testing` tab.

![test-explorer](images/test-explorer.png)

### Command Line

Run with (`Cmd+Shift+P` on OSX or `Ctrl+Shift+P` on Windows and Linux) and execute:

- `PHPUnit Test Nearest`: This command will search the nearest function from the cursor position until the file's beginning.

![test-nearest](images/test-nearest.gif)

- `PHPUnit Test Current File`: This command will test the current active file.

![test-file](images/test-file.gif)

- `PHPUnit Test All Suite`: This command will run all the test suite.

![test-suite](images/test-suite.gif)

- `PHPUnit Test All Suite With Exclusions`: This command will run the test suite without the excluded groups set in the configuration.

- `PHPUnit Test`: This command will show a window to pick the test to run.

![test-pick](images/test-pick.gif)

- `PHPUnit Run Last Test`: This command will run the last test ran.

![test-last](images/test-last.gif)

- `PHPUnit Cancel Current Test`: This command will cancel the current running test.

![test-cancel](images/test-cancel.gif)

## Credits / Links

- [santigarcor](https://github.com/santigarcor/vscode-phpunit-extended)
- [calebporzio](https://github.com/calebporzio/better-phpunit)
- [VSCode's Extensions Samples](https://github.com/microsoft/vscode-extension-samples/tree/main/test-provider-sample)
- [VSCode's Testing Documentation](https://code.visualstudio.com/api/extension-guides/testing)

## License

The MIT License (MIT). Please see the [license file](LICENSE.md) for more information.
