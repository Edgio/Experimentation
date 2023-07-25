# @edgio/experimentation - README

## Overview

The `@edgio/experimentation` package is designed to parse information from the `x-edg-experiments` cookie. This cookie contains data about the experiments and variants that a user is currently assigned to. By using this package, customers can easily extract and utilize the experiment and variant information from the cookie in their applications.

## Installation

To use this package in your project, you can install it via npm or yarn:

```bash
npm install @edgio/experimentation

# or

yarn add @edgio/experimentation
```

## Usage

The package exports a single function called `parseExperimentationInfo`, which takes the `cookieValue` as a parameter and returns a JavaScript object containing the experiment and variant information.

```javascript
const { parseExperimentationInfo } = require('@edgio/experimentation');

// get cookie from server request or browser
const cookieValue = 'Testing_new_page_1238476236=New_page_816213&New_Banner_Test_8123712=Old_banner_712312';
const experimentationInfo = parseExperimentationInfo(cookieValue);

console.log(experimentationInfo);
```

Output:

```
{
    Testing_new_page_1238476236: 'New_page_816213',
    New_Banner_Test_8123712: 'Old_banner_712312'
}
```

Now this information can be used in your application. For example
```javascript
if (experimentationInfo.Testing_new_page_1238476236 === 'New_page_816213') {
    // show new page
} else {
    // show old page
}

// Or exposing the Edgio Experimentation information to Google Analytics
ga('set', 'dimension1', experimentationInfo.Testing_new_page_1238476236);

```

## Error Handling

If the provided cookie value is not a string, the function will throw an error indicating that the cookie must be a string.

## Contribution

We welcome contributions from the community! If you encounter any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request on our GitHub repository.

## License

This package is open-source and available under the [MIT License](https://opensource.org/licenses/MIT). Please refer to the LICENSE file for more details.
