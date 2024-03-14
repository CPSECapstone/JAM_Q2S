// noinspection LanguageDetectionInspection

export const exampleTermData = [
  {
    termName: 'Fall 2027',
    classes: [
      {
        id: 'CSC123',
        color: '#FFEA9E'
      },
      {
        id: 'MATH141',
        color: '#FFEA9E'
      },
      {
        id: 'COMS101',
        color: '#FFEA9E'
      }
    ],
    totalUnits : 12
  },
  {
    termName: 'Winter 2027',
    classes: [
      {
        id: 'CSC101',
        color: '#FFEA9E'
      },
      {
        id: 'MATH142',
        color: '#FFEA9E'
      },
      {
        id: 'ENGL134',
        color: '#FFEA9E'
      }
    ],
    totalUnits : 12
  },
  {
    termName: 'Spring 2027',
    classes: [
      {
        id: 'CSC202',
        color: '#FFEA9E'
      },
      {
        id: 'MATH143',
        color: '#FFEA9E'
      },
      {
        id: 'COMS126',
        color: '#FFEA9E'
      }
    ],
    totalUnits : 12
  },
  {
    termName: 'Fall 2028',
    classes: [
      {
        id: 'CSC203',
        color: '#FFEA9E'
      },
      {
        id: 'CSC225',
        color: '#FFEA9E'
      },
      {
        id: 'MATH241',
        color: '#FFEA9E'
      },
      {
        id: 'CHEM124',
        color: '#FFEA9E'
      }
    ],
    totalUnits : 16
  },
  {
    termName: 'Winter 2028',
    classes: [
      {
        id: 'CSC357',
        color: '#FFEA9E'
      },
      {
        id: 'CSC248',
        color: '#FFFFFF'
      },
      {
        id: 'MATH244',
        color: '#FFEA9E'
      },
      {
        id: 'CHEM125',
        color: '#FFEA9E'
      }
    ],
    totalUnits : 16
  },
  {
    termName: 'Spring 2028',
    classes: [],
    totalUnits : 0
  },
  {
    termName: 'Fall 2029',
    classes: [],
    totalUnits : 0
  },
  {
    termName: 'Winter 2029',
    classes: [],
    totalUnits : 0
  },
  {
    termName: 'Spring 2029',
    classes: [],
    totalUnits : 0
  },
  {
    termName: 'Fall 2030',
    classes: [],
    totalUnits : 0
  },
  {
    termName: 'Winter 2030',
    classes: [],
    totalUnits : 0
  },
  {
    termName: 'Spring 2030',
    classes: [],
    totalUnits : 0
  }
];

/*
  Below is the API Post request for adding the example term data above to the database
  The flowchart JSON is taken in a String and must therefore be on one line
 */
// POST http://localhost:8080/FlowchartTemplates
// {
//     "catalog": "2022-2026",
//     "major": "CS-Example",
//     "concentration": "Example",
//     "flowchart": "[\n{\n \"termName\": \"Fall 2027\",\n \"classes\": [\n {\n \"id\": \"CSC123\",\n\"color\": \"#FFEA9E\"\n},\n{\n\"id\": \"MATH141\",\n\"color\": \"#FFEA9E\"\n},\n{\n\"id\": \"COMS101\",\n\"color\": \"#FFEA9E\"\n}\n]\n},\n{\n\"termName\": \"Winter 2027\",\n\"classes\": [\n{\n\"id\": \"CSC101\",\n\"color\": \"#FFEA9E\"\n},\n{\n\"id\": \"MATH142\",\n\"color\": \"#FFEA9E\"\n},\n{\n\"id\": \"ENGL134\",\n\"color\": \"#FFEA9E\"\n}\n]\n},\n{\n\"termName\": \"Spring 2027\",\n\"classes\": [\n{\n\"id\": \"CSC202\",\n\"color\": \"#FFEA9E\"\n},\n{\n\"id\": \"MATH143\",\n\"color\": \"#FFEA9E\"\n},\n{\n\"id\": \"COMS126\",\n\"color\": \"#FFEA9E\"\n}\n]\n},\n{\n\"termName\": \"Fall 2028\",\n\"classes\": [\n{\n\"id\": \"CSC203\",\n\"color\": \"#FFEA9E\"\n},\n{\n\"id\": \"CSC225\",\n\"color\": \"#FFEA9E\"\n},\n{\n\"id\": \"MATH241\",\n\"color\": \"#FFEA9E\"\n},\n{\n\"id\": \"CHEM124\",\n\"color\": \"#FFEA9E\"\n}\n]\n},\n{\n\"termName\": \"Winter 2028\",\n\"classes\": [\n{\n\"id\": \"CSC357\",\n\"color\": \"#FFEA9E\"\n},\n{\n\"id\": \"CSC248\",\n\"color\": \"#FFFFFF\"\n},\n{\n\"id\": \"MATH244\",\n\"color\": \"#FFEA9E\"\n},\n{\n\"id\": \"CHEM125\",\n\"color\": \"#FFEA9E\"\n}\n]\n},\n{\n\"termName\": \"Spring 2028\",\n\"classes\": []\n},\n{\n\"termName\": \"Fall 2029\",\n\"classes\": []\n},\n{\n\"termName\": \"Winter 2029\",\n\"classes\": []\n},\n{\n\"termName\": \"Spring 2029\",\n\"classes\": []\n},\n{\n\"termName\": \"Fall 2030\",\n\"classes\": []\n},\n{\n\"termName\": \"Winter 2030\",\n\"classes\": []\n},\n{\n\"termName\": \"Spring 2030\",\n\"classes\": []\n}\n]"
// }
/* Below is the Flowchart ID of this example data in the flowchart for later proof of concept that
*  We can use flowchart data from the database */
// "id": 252
