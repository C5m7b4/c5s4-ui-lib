# C5S4-UI-Lib
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/C5m7b4/c5s4-ui-lib/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/C5m7b4/c5s4-ui-lib/tree/master)
[![codecov](https://codecov.io/gh/C5m7b4/c5s4-ui-lib/graph/badge.svg?token=O6WXWJWVE2)](https://codecov.io/gh/C5m7b4/c5s4-ui-lib)
![GitHub repo file or directory count](https://img.shields.io/github/directory-file-count/C5m7b4/c5s4-ui-lib)
![GitHub License](https://img.shields.io/github/license/C5m7b4/c5s4-ui-lib)
![GitHub package.json version](https://img.shields.io/github/package-json/v/C5m7b4/c5s4-ui-lib)


This is tiny Typescript package with the following components:
## Components in Library
[Select](#select)

[Table](#table)

[Toasts](#toasts)

## Installation
```js
    npm install c5s4-ui-lib
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


## Toasts
This is a small toast library that is very useful.
