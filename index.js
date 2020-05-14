// 2 days out - loop through this function 2x
let nextWorkDay;
//test date
let tDate = new Date();

function workWeekday(){	
	
	switch(tDate.getDay()){
		  // Sunday - Saturday : 0 - 6 
		case 0:
			//Sun
		case 1:
			//Mon
		case 2:
			//Tues
		case 3:
			// Wed
		case 4:
			// Thurs
			nextWorkDay = new Date(tDate.setDate(tDate.getDate() +1));
			// console.log(nextWorkDay.getDay() + " weekday . Next work day: " + nextWorkDay.getDate());
		break;
		case 5:
			// Fri
			nextWorkDay = new Date(tDate.setDate(tDate.getDate() +1));
			// console.log("Fri " + nextWorkDay);
		case 6: 
			// Sat
			nextWorkDay = new Date(tDate.setDate(tDate.getDate() +2));
			// console.log("Sat: " + nextWorkDay.getDay() + " weekend scenario. Next work day: " + nextWorkDay.getDate());
		break;
	}
	return nextWorkDay;
}
workWeekday();

let eventCalendar0 = {
	getTitle: 'Test 8:30',
	getStartTime: new Date( 'Mon Apr 27 2020 05:30:00 GMT-0700 (Pacific Daylight Time)'),
	getEndTime: new Date( "Mon Apr 27 2020 06:30:00 GMT-0700 (Pacific Daylight Time)"),
};
let eventCalendar1 = {
	getTitle: 'Test 11-12',
	getStartTime: new Date( "Mon Apr 27 2020 09:00:00 GMT-0700 (Pacific Daylight Time)"),
	getEndTime: new Date( "Mon Apr 27 2020 11:00:00 GMT-0700 (Pacific Daylight Time)"),
};
let eventCalendar2 = {
	getTitle: 'Test 11-12',
	getStartTime: new Date( "Mon Apr 27 2020 11:00:00 GMT-0700 (Pacific Daylight Time)"),
	getEndTime: new Date( "Mon Apr 27 2020 12:00:00 GMT-0700 (Pacific Daylight Time)"),
};
let eventCalendar3 ={
	getTitle: 'Test 1-3',
	getStartTime: new Date( "Mon Apr 27 2020 13:00:00 GMT-0700 (Pacific Daylight Time)"),
	getEndTime: new Date( "Mon Apr 27 2020 15:00:00 GMT-0700 (Pacific Daylight Time)"),
};
let eventCalendar4 ={
	getTitle: 'Test 3-4',
	getStartTime: new Date( "Mon Apr 27 2020 15:00:00 GMT-0700 (Pacific Daylight Time)"),
	getEndTime: new Date( "Mon Apr 27 2020 16:00:00 GMT-0700 (Pacific Daylight Time)")
};

//array that will simulate the calendar booked on Google Calendar
//globals
let calBooked = [eventCalendar0, eventCalendar1, eventCalendar2, eventCalendar3, eventCalendar4];
let calBlock = [];
let userStartTime   = new Date(nextWorkDay.setHours(8));
let userEndTime 	= new Date(nextWorkDay.setHours(17));
let i 				= 0;

//objects that will be pushed into the calendar
class newEvent {
	constructor(st, sp) {
		this.title = "Admin - Don't Block Update this to a user input";
		this.startTime = st;
		this.endTime = sp;
	}
};

//check for chained
function chained (x){
	// get the booked length
	// check if there is a value for the +1
	if(calBooked[x].getEndTime.getTime() == calBooked[x + 1].getStartTime.getTime()){
		while(calBooked[x].getEndTime.getTime() == calBooked[x + 1].getStartTime.getTime()) {
			console.log("chain match");
			x++;
		}
	}
	//update i
	i = x;
	// return evaluation of lastEnd
	return calBooked[i].getStartTime;
}
//create the new blocker event
function blockEvent() {
	cStartTime = cLastEnd;
	cEndTime = calBooked[i].getEndTime;
	//check chained
	cLastEnd = chained(i);
	calBlock.push( new newEvent(cStartTime, cEndTime));
}

function calBlocker(){
	//test for "blocked" dates i.e. on calendar and accepted
	//Replace the start & end with user choosen variables 
	let cStartTime 		= null;
	let cEndTime 		= null;
	let cLastEnd 		= null;

	//nothing booked
	if(calBooked.length == 0) {
		calBlock.push( new newEvent(userStartTime, userEndTime));
	}
	// check if the end time is before 8AM then skip it	
	if (calBooked[i].getEndTime < userStartTime) {
		lastEnd = userStartTime;
		i++;
	}
	// last array item start time is less that the user defined end time
	while( calBooked[i].getEndTime < userEndTime) {	
		
		// starts before  8 AM
		if( calBooked[i].getStartTime <= userStartTime) {
			console.log(i);
			//check chain, create start time, end time
			cStartTime = userStartTime;
			endTime = chained(i);
			calBlock.push( new newEvent(cStartTime, cEndTime));
		}
		// booked event starts before end of user defined day
		while( calBooked[i].getStartTime <= userEndTime) {
			console.log("instance " + i +", 1. " + calBooked[i].getStartTime + "is less than or equal " + lastEnd + i);
			cStartTime = cLastEnd;
			cEndTime = calBooked[i].getEndTime;
			//check chained
			cLastEnd = chained(i);
			calBlock.push( new newEvent(cStartTime, cEndTime));
			i++;
			// console.log("startTime: " + calBlock);
			// console.log("startTime: " + startTime.getHours() +":"+ startTime.getMinutes());
			// console.log("endTime: " + endTime.getHours() +":"+ endTime.getMinutes());
			// console.log("Array length: " + calBlock.length);
		}
	}
};
calBlocker();