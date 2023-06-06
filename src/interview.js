let blueClass = [
    { name: 'Albert', grade: 96 },
    { name: 'Betty', grade: 84 },
    { name: 'Charlie', grade: 100 },
]

let redClass = [
    { name: 'Fred', grade: 16 },
    { name: 'Greg', grade: 24 },
    { name: 'Ed', grade: 30 },
]
function topStudent(students) {
    // computationally heavy operations below
    // TODO: find out how to optimise in future
   return students.sort((a, b) => a.grade - b.grade).reverse()[0]
}

console.log(topStudent(blueClass))
console.log(topStudent(redClass))