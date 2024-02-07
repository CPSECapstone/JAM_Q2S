export const testData = JSON.stringify({
  classes: {
    class1: { id: 'class1' },
    class2: { id: 'class2' },
    class3: { id: 'class3' }
  },
  quarters: {
    quarter1: {
      id: 'quarter1',
      title: '2016-17',
      classes: ['class1', 'class2', 'class3']
    }
  },
  quarterOrder : ['quarter1']
});