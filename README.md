# Edgio Experimentation

## Overview

The `@edgio/experimentation` package provides utilities to extract experiment and variant information from both the `x-edg-experiments-info` origin header and server timing response headers. This allows customers to easily access and utilize the experiment and variant information in their applications.

## Installation

To use this package in your project, you can install it via npm or yarn:

```bash
npm install @edgio/experimentation

# or

yarn add @edgio/experimentation
```

## Accessing Information in Frontend through Server-Timing Header

Each response with experiments information will have a `Server-Timing` header that has a value similar to this:

```
Server-Timing: edgio_cache;desc=TCP_MISS,edgio_pop;desc=dcd,edgio_country;desc=UA,experiments;desc=%7B%22Testing_new_page_1238476236%22%3A%22New_page_816213%22%2C%22New_Banner_Test_8123712%22%3A%22Old_banner_712312%22%7D
```

The Experimentation information in this header (encoded in the `experiments` description field) can be access like so:

```javascript
import { getInfoForPath } from '@edgio/experimentation';

const relativeUrl = '/path/to/resource';
getInfoForPath(relativeUrl).then((info) => {
    if (info) {
        console.log(info);
    } else {
        console.log('No experimentation info found for the given path.');
    }
});

/*
{
    "Testing_new_page_1238476236": "New_page_816213",
    "New_Banner_Test_8123712": "Old_banner_712312"
}
 */
```

This can be parsed as JSON in your application, giving you a map of Experiment IDs (keys) and their corresponding Variant IDs (values).

You can also use our open-source Experiments library to parse this information as shown below.

## Accessing Information in Backend through x-edg-experiments-info Header

For the request in the example above, when it is received in your backend, it will have the following `x-edg-experiments-info` header:

```
x-edg-experiments-info: %7B%22Testing_new_page_1238476236%22%3A%22New_page_816213%22%2C%22New_Banner_Test_8123712%22%3A%22Old_banner_712312%22%7D
```

Similar to the frontend, this header value can be parsed like so:

```javascript
import { parseInfoFromValue } from '@edgio/experimentation';
const experimentationInfo = parseInfoFromValue(headers.get('x-edg-experiments-info'));

console.log(experimentationInfo);
/*
{
    "Testing_new_page_1238476236": "New_page_816213",
    "New_Banner_Test_8123712": "Old_banner_712312"
}
*/
```

The `experimentationInfo` provides a JSON object that can be used in your application, giving you a map of Experiment IDs (keys) and their corresponding Variant IDs (values).

## Error Handling
- If the provided header value is not a string, the `parseInfoFromValue` function will throw an error indicating that the header must be a string.
- If no experimentation info is found for the given path using `getInfoForPath`, it will resolve with `undefined`.

## Contribution

We welcome contributions from the community! If you encounter any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request on our GitHub repository.

## License

This package is open-source and available under the [MIT License](/LICENSE). Please refer to the LICENSE file for more details.

