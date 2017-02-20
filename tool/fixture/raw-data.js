module.exports = {
  Homework: [{
      '_id': '58aafe860aa4eb5f06ce151c',
    homeworkName: 'guessNumber'
  }, {
    '_id': '58aafe980aa4eb5f06ce151d',
    homeworkName: 'test'
  }],
  Section: [{
    '_id': '58aa9523d20cf53090244b88',
    sectionName: 'java',
    homeworks: [
      '58aafe860aa4eb5f06ce151c',
      '58aafe980aa4eb5f06ce151d'
    ]
  },
    {
      '_id': '58aa968a3e73d03206921aee',
      sectionName: 'js',
      homeworks: [
        '58aafe980aa4eb5f06ce151d'
      ]
    }],
  Paper: [{
    "_id": "58aaf9b799a1e75674df7e6a",
    paperName: "test1",
    sections: [
      '58aa9523d20cf53090244b88',
      '58aa968a3e73d03206921aee'
    ]
  },
    {
      "_id": "58aaf9c899a1e75674df7e6c",
      paperName: "test3",
      sections: [
        '58aa968a3e73d03206921aee'
      ]
    }]
};