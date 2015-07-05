/* Task Description */
/*
* Create a module for a Telerik Academy course
  * The course has a title and presentations
    * Each presentation also has a title
    * There is a homework for each presentation
  * There is a set of students listed for the course
    * Each student has firstname, lastname and an ID
      * IDs must be unique integer numbers which are at least 1
  * Each student can submit a homework for each presentation in the course
  * Create method init
    * Accepts a string - course title
    * Accepts an array of strings - presentation titles
    * Throws if there is an invalid title
      * Titles do not start or end with spaces
      * Titles do not have consecutive spaces
      * Titles have at least one character
    * Throws if there are no presentations
  * Create method addStudent which lists a student for the course
    * Accepts a string in the format 'Firstname Lastname'
    * Throws if any of the names are not valid
      * Names start with an upper case letter
      * All other symbols in the name (if any) are lowercase letters
    * Generates a unique student ID and returns it
  * Create method getAllStudents that returns an array of students in the format:
    * {firstname: 'string', lastname: 'string', id: StudentID}
  * Create method submitHomework
    * Accepts studentID and homeworkID
      * homeworkID 1 is for the first presentation
      * homeworkID 2 is for the second one
      * ...
    * Throws if any of the IDs are invalid
  * Create method pushExamResults
    * Accepts an array of items in the format {StudentID: ..., Score: ...}
      * StudentIDs which are not listed get 0 points
    * Throw if there is an invalid StudentID
    * Throw if same StudentID is given more than once ( he tried to cheat (: )
    * Throw if Score is not a number
  * Create method getTopStudents which returns an array of the top 10 performing students
    * Array must be sorted from best to worst
    * If there are less than 10, return them all
    * The final score that is used to calculate the top performing students is done as follows:
      * 75% of the exam result
      * 25% the submitted homework (count of submitted homeworks / count of all homeworks) for the course
*/

function solve() {
    var Course = {

        init: function(title, presentations) {
            checkPresentations(presentations);
            this.presentations = presentations;
            this.title = checkTitle(title);
            this.students = [];
            this.iDs = 0;//in order the first student to be with id 0
            return this;
        },
        addStudent: function(name) {
            var toAdd = Object.create(Student);
            this.iDs++;
            name = validateStudent(name);
            toAdd.init(name[0], name[1], this.iDs, this.presentations.length);
            this.students.push(toAdd);

            return this.iDs;
        },
        getAllStudents: function() {
            return this.students.map(function(st){
                return st.returnStudent();
            });
        },
        submitHomework: function(studentID, homeworkID) {
            var exists = false;
            if(homeworkID < 1 || homeworkID > this.presentations.length){
                throw new Error('No such presentation!');
            }
            this.students.forEach(function(student){
                if(student.id === studentID){
                    exists = true;
                    if(student.homeworks.indexOf(homeworkID) < 0){
                        student.submitHomework(homeworkID);
                    }
                }
            });
            if(!exists){
                throw new Error('Invalid student ID!');
            }
        },
        pushExamResults: function(results) {
            var numberOfStudents = this.students.length,
                i = 0;
            if(! (results instanceof Array)){
                throw new Error('results must be an array!');
            }
            for(i = 0, len = results.length; i < len; i++){
                var index = results[i].StudentID;
                validateNumber(index);
                validateNumber(results[i].score);
                if(index < 1 || index > numberOfStudents){
                    throw new Error('No such student');
                }
                this.students[index - 1].setScore(results[i].score);
            }

        },
        getTopStudents: function() {
            var topSt = [];
            this.students.forEach(function(student){
                student.getFinalResult();
                topSt.push({
                    id: student.id,
                    firstname: student.firstname,
                    lastname: student.lastname,
                    finalResult: student.finalResult
                });
            });


            function compare(a, b) {
                if (a.finalResult < b.finalResult)
                    return 1;
                if (a.finalResult > b.finalResult)
                    return -1;
                return 0;
            }
            topSt.sort(compare);
            if (topSt.length > 10){
                topSt.splice(10);
            }
            return topSt;
        }
    },
    Student = {
        init: function(fname, lname, id, homeworksTotal){
            this.firstname = fname;
            this.lastname = lname;
            this.id = id;
            this.homeworks = [];
            this.homeworksTotal = homeworksTotal;
            this.exam = [0, false];
            return this;
        },
        setScore: function(score){
            if (this.exam[1]){
                //console.log('Cheater detected!');
                throw new Error('Cheater detected!');
            }
            this.exam[0] = score;
            this.exam[1] = true;
        },
        submitHomework: function(toSubmit){
            this.homeworks.push(toSubmit);
        },
        returnStudent: function(){
            this.getFinalResult();
            return {firstname: this.firstname, lastname: this.lastname, id: this.id};
        },
        getFinalResult: function(){
            var hw = (this.homeworks.length / this.homeworksTotal) * 25,
                exam = this.exam[0] * 75 / 100;
            this.finalResult = hw + exam;
        }

    };


    //HELPER FUNCTIONS

    function checkTitle(name){
        if (typeof name !== 'string' || name === ''){
            throw new Error('Title must be string')
        } else if(name[0] === ' ' || name[name.length - 1] === ' '){
            throw new Error('Title cannot start or end with a space')
        }
        else if (name.match(/(  )/g)){
            throw new Error('Title cannot contain consecutive spaces')
        }

        return name;
    }

    function checkPresentations(pres) {
        if (pres.length < 1){
            throw new Error('Course must have at least one presentation!')
        }
        pres.forEach(function(item){
            checkTitle(item);
        });
    }

    function checkName(name){
        if(!(name.match(/\b[A-Z][a-z]+\b/g) || name.match(/\b[A-Z]\b/g))){
            throw new Error('Invalid Name!');
        }
    }

    function validateStudent(name){
        var result = [];
        if (typeof name !== 'string' || name === ''){
            throw new Error('Name must be a string!')
        }
        result = name.split(' ');
        if(result.length !== 2){
            throw new Error('Invalid number of names!')
        }
        result.forEach(function(item){
            checkName(item);
        });

        return result;
    }

    function validateNumber(num){
        if(isNaN(num)){
            throw new Error('Result or id is not a number!');
        }
    }




    return Course;
}
    //The official tests caused a lot of trouble....

    // var Course = solve();
    // //LOCAL TEST
    // var course = Object.create(Course);
    // course.init('Java Script Basics', ['lecture1', 'lecture2', 'lecture3', 'lecture4', 'lecture5']);
    // console.log(course);

    // course.addStudent('John Kirov');
    // course.addStudent('Sam Genkov');
    // course.addStudent('Nick Simeonov');
    // course.addStudent('Kiro Pora');
    // course.addStudent('Mitko Kartofa');
    // course.addStudent('John Kirov');
    // course.addStudent('Sam Genkov');
    // // course.addStudent('Nick Simeonov');
    // // course.addStudent('Kiro Pora');
    // // course.addStudent('Mitko Kartofa');
    // // course.addStudent('John Kirov');
    // // course.addStudent('Sam Genkov');
    // // course.addStudent('Nick Simeonov');
    // // course.addStudent('Kiro Pora');
    // // course.addStudent('Mitko Kartofa');

    // course.submitHomework(1, 1);
    // course.submitHomework(1, 2);
    // course.submitHomework(1, 3);
    // course.submitHomework(1, 4);
    // course.submitHomework(1, 5);

    // course.submitHomework(2, 1);
    // course.submitHomework(2, 2);
    // course.submitHomework(2, 3);
    // course.submitHomework(2, 4);
    // course.submitHomework(2, 5);

    // course.pushExamResults([{StudentID: 1, score: 80}, {StudentID: 2, score: 11}, {StudentID: 3, score: 66}]);
    // course.pushExamResults([{StudentID: 4, score: 78}, {StudentID: 5, score: 45}, {StudentID: 6, score: 26}]);
    // // course.pushExamResults([{StudentID: 7, score: 4}, {StudentID: 8, score: 35}, {StudentID: 9, score: 87}]);
    // // course.pushExamResults([{StudentID: 10, score: 54}, {StudentID: 11, score: 15}, {StudentID: 12, score: 100}]);
    // // course.pushExamResults([{StudentID: 13, score: 76}, {StudentID: 14, score: 0}, {StudentID: 15, score: 97}]);


    // console.log(course.getTopStudents());







module.exports = solve;
