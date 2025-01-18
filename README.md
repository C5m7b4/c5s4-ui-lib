# C5 tiny package
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/C5m7b4/c5-tiny-package/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/C5m7b4/c5-tiny-package/tree/master)
[![codecov](https://codecov.io/gh/C5m7b4/c5-tiny-package/graph/badge.svg?token=2VW2NXHJ8V)](https://codecov.io/gh/C5m7b4/c5-tiny-package)
![GitHub repo file or directory count](https://img.shields.io/github/directory-file-count/C5m7b4/c5-tiny-package)
![GitHub License](https://img.shields.io/github/license/C5m7b4/c5-tiny-package)
![GitHub package.json version](https://img.shields.io/github/package-json/v/C5m7b4/c5-tiny-package)


This is tiny Typescript package with the following components:
## Components in Library
[Select](#select)

[Table](#table)

## Installation
```js
    npm install c5-tiny-package
```


## Select
| Prop   | Type | Required | Default value |
| :------- | :------: | :-----: | :----- |
| data | anything | ✅ | empty |
| displayValue | keyof data | ✅ | empty |
| label | string | ✅ | empty |
| onSelect | function | | empty |
| labelPosition | 'top', 'left' | | 'top' |

```js
      <Select<iData>
        data={data}
        displayKey={'name'}
        label={'Select type'}
        labelPosition="top"
        onSelect={(e: iData) => {
          console.log(e);
        }}
      />
```


## Table
| Prop   | Type | Required | Default value |
| :------- | :------: | :-----: | :----- |
| data | anything | ✅ | empty |
| headers | ITableHeader[] | ✅ | empty |
| backgroundColorClass | string |  | empty |
| backgroundColorStyle | string | | empty |
| textColorClass | string | | empty |
| textColorStyle | string | | empty |
| footerBackgroundClass | string | | empty |
| footerBackgroundColorStyle | string | | empty |
| footerTextColorClass | string | | empty |
| footerTextColorStyle | string | | empty |
| hoverClass | string | | empty |
| striped | boolean | | true |
| stripeEvenClass | string | | empty |
| stripeOddClass | string | | empty |

```js
 <Table data={tableData} headers={tableHeaders} />
```
