var Student=require('./Students.json');
var async=require('async');
var Sub1=require('./Sub1');
var Sub2=require('./Sub2');
var Sub3=require('./Sub3');
var flag;
var id;

exports.find = function(req,res) {
	
	// 1. check if valid query parameter
	if(!req.query.email){
		res.send("Invalid Query parameter.");
		return;
	}

	// 2. check if student with this email id exist in the records
	var email_id=req.query.email;

	for (var i = 0; i <=Student.students.length-1 ; i++) {

		// if student found then set the flag as true;
		if(Student.students[i].email==email_id){
			flag=1;
			break;
		}
		else
			flag=0;
	}

	// If student not found then send appropriate message to the user+
	if (flag != 1){
		res.send(400, { error: 'Student not found in records' });
		return;
	}
	
	//assigning value of id from student 
	id=Student.students[i].id;
	var SubjectName=null;

	//3.making a call to async parallel function which is having array of functions. They all be called parallely.
	async.parallel([
		function(callback){
			console.log("in 1nd function");
			//giving a call to a function which will search id in respective Sub.json passing respected json object.
			SubjectName=getSubjectDetails(Sub1);
        	callback(null,SubjectName);
    	},
		function(callback){
   			console.log("in 2nd function");
   			//giving a call to a function which will search id in respective Sub.json passing respected json object.
   			SubjectName=getSubjectDetails(Sub2);
        	callback(null, SubjectName);
    	},
    	function(callback){
   			console.log("in 3rd function");
   			//giving a call to a function which will search id in respective Sub.json passing respected json object.
   			SubjectName=getSubjectDetails(Sub3);
        	callback(null, SubjectName);
    	}],
		//Callback function for getting all results of functions.
		function(err,results){
			console.log(results);
			//Checking for any error occured, then giving an error message.
			if(err!=null){
				res.send("Some thing went wrong");
				return;
			}
			//Else sending required results array in response.
			res.send("Student"+" "+email_id+" "+"is enrolled in following subjects: "+results.filter(String)+" ");
		}
	);
};

//function for serching required id in respected sub.json. Passing a json object.
var getSubjectDetails=function(Sub){
	var SubjectName="";
	for (var i = 0; i <=Sub.enrolledStudents.length-1 ; i++) {
				if(Sub.enrolledStudents[i].id==id){
					SubjectName=Sub.subjectName;
					break;
				}
			}
			return SubjectName;
} 
