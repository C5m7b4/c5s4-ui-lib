# C5 tiny package



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
