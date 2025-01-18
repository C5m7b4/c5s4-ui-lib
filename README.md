# C5S4-UI-Lib
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/C5m7b4/c5s4-ui-lib/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/C5m7b4/c5s4-ui-lib/tree/master)


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
