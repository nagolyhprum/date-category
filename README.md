# date-category
Utility for categorizing dates into range names

# Installation

`npm i --save date-category`

Example Usage:

```js
import dateCategory from 'date-category'
const today = new Date()
const yesterday = new Date(Date.now() - (1000 * 60 * 60 * 24))
const tomorrow = new Date(Date.now() + (1000 * 60 * 60 * 24))
console.log(dateCategory(today)) //outputs "today"
console.log(dateCategory(yesterday)) //outputs "yesterday"
console.log(dateCategory(tomorrow)) //outputs "tomorrow"

//you can also compare to any date you want
console.log(dateCategory(today, yesterday)) //outputs "tomorrow"
```

All categories available:

* earlier - Over 2 years ago
* last year
* earlier this year
* last month
* earlier this month
* last week - week starts on monday
* last weekend
* earlier this week
* yesterday
* today
* tomorrow
* this week
* this weekend
* next week
* next weekend
* this month
* next month
* this year
* next year
* later - Over 2 years from now

# Contributing

After cloning run the following to get started:

```bash
$ npm i
$ npm install gulp-cli -g
```

Run the following to see a list of tasks:

`gulp --tasks`

The following tasks are available:

* build - builds the code
* fix - lints the code
* test - tests the code
* demo - demos the code
* deploy - patches and deploys the code

Just make a pull request or create an issue and will happily add a feature :)
