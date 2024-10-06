const students = [
  { name: 'B', score: 72, school: 'school1' },
  { name: 'E', score: 88, school: 'school1' },
  { name: 'F', score: 78, school: 'school2' },
  { name: 'D', score: 65, school: 'school1' },
  { name: 'C', score: 91, school: 'school1' },
  { name: 'I', score: 60, school: 'school2' },
  { name: 'A', score: 85, school: 'school1' },
  { name: 'G', score: 54, school: 'school2' },
  { name: 'H', score: 95, school: 'school2' },
  { name: 'J', score: 92, school: 'school2' }
];

//Anwser a
const filterRecordByName = (name) => students.find((student) => student && student.name === name);
// console.log(filterRecordByName('H'));

// Answer b
const findStudentByNameSafe = (name) => students.find((student) => student?.name === name);
// console.log(findStudentByNameSafe('G'));

// Answer c
const filterStudentsByScoreRangeAndSchool = (minScore, maxScore, school) =>
  students.filter(
    (student) =>
      student && student.score >= minScore && student.score <= maxScore && student.school === school
  );
// console.log(filterStudentsByScoreRangeAndSchool(60, 90, 'school2'));

// Answer d
// const distinctSchools = [
//   ...new Set(students.filter((student) => student).map((student) => student.school))
// ];
// console.log(distinctSchools); // ['school1', 'school2']

// Answer e
function sortBySchoolAndName(studentA, studentB) {
//   console.log(studentA, ' A-----B ', studentB);
  // compare by school
  if (studentA.school > studentB.school) {
    return 1;
  } else if (studentA.school < studentB.school) {
    return -1;
  }

  // If schools are the same, compare by name
  if (studentA.name > studentB.name) {
    return 1;
  } else if (studentA.name < studentB.name) {
    return -1;
  }

  return 0;
}

students.sort(sortBySchoolAndName);
console.log(students);
