import chalk from 'chalk'

console.log(chalk.green('Testing Environment!!'))
const ex = "fixtures/events";

console.log(ex.split('/')[1]);

const ex1 = 'something/home'

const testObj = {
  name: 'nicole',
  job: {
    overseas: 'teacher',
    home: 'bartender'
  }
}

console.log(testObj.job[ex1.split('/')[1]])