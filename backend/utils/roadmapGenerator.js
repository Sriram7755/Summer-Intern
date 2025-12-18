const roadmapTemplates = {
  'web-development': {
    beginner: {
      weeks: [
        {
          weekNumber: 1,
          title: 'HTML & CSS Fundamentals',
          topics: [
            {
              title: 'HTML Basics',
              description: 'Learn HTML structure, tags, and semantic elements',
              resources: [
                { title: 'HTML Crash Course', type: 'video', url: 'https://youtube.com/watch?v=UB1O30fR-EE', duration: '1h' },
                { title: 'MDN HTML Guide', type: 'article', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML', duration: '2h' },
                { title: 'HTML Practice', type: 'practice', url: 'https://codepen.io', duration: '3h' }
              ]
            },
            {
              title: 'CSS Styling',
              description: 'Master CSS selectors, properties, and layouts',
              resources: [
                { title: 'CSS Complete Guide', type: 'video', url: 'https://youtube.com/watch?v=yfoY53QXEnI', duration: '2h' },
                { title: 'CSS Flexbox Guide', type: 'article', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', duration: '1h' }
              ]
            }
          ],
          estimatedHours: 8
        },
        {
          weekNumber: 2,
          title: 'JavaScript Fundamentals',
          topics: [
            {
              title: 'JavaScript Basics',
              description: 'Variables, functions, and control structures',
              resources: [
                { title: 'JavaScript Fundamentals', type: 'video', url: 'https://youtube.com/watch?v=hdI2bqOjy3c', duration: '3h' },
                { title: 'JavaScript.info Tutorial', type: 'article', url: 'https://javascript.info', duration: '4h' }
              ]
            }
          ],
          estimatedHours: 10
        }
      ]
    },
    intermediate: {
      weeks: [
        {
          weekNumber: 1,
          title: 'Advanced JavaScript & ES6+',
          topics: [
            {
              title: 'Modern JavaScript Features',
              description: 'Arrow functions, destructuring, modules',
              resources: [
                { title: 'ES6 Features', type: 'video', url: 'https://youtube.com/watch?v=NCwa_xi0Uuc', duration: '2h' }
              ]
            }
          ],
          estimatedHours: 12
        }
      ]
    }
  },
  'data-science': {
    beginner: {
      weeks: [
        {
          weekNumber: 1,
          title: 'Python for Data Science',
          topics: [
            {
              title: 'Python Basics',
              description: 'Variables, data types, and control structures',
              resources: [
                { title: 'Python Crash Course', type: 'video', url: 'https://youtube.com/watch?v=rfscVS0vtbw', duration: '4h' }
              ]
            }
          ],
          estimatedHours: 15
        }
      ]
    }
  }
};

function generateRoadmap(careerGoal, skillLevel, studyTime) {
  const template = roadmapTemplates[careerGoal]?.[skillLevel] || roadmapTemplates['web-development']['beginner'];
  
  // Adjust based on study time
  const adjustedWeeks = template.weeks.map(week => ({
    ...week,
    estimatedHours: Math.min(week.estimatedHours, studyTime)
  }));

  return {
    totalWeeks: adjustedWeeks.length,
    weeks: adjustedWeeks
  };
}

module.exports = { generateRoadmap };