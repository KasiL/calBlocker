// 2 days out - loop through this function 2x
let nextWorkDay;
//test date
let tDate = new Date(2020, 3, 24);

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
	getTitle: 'skip 5:30-6:30',
	getStartTime: new Date( 'Mon Apr 27 2020 05:30:00 GMT-0700 (Pacific Daylight Time)'),
	getEndTime: new Date( "Mon Apr 27 2020 07:30:00 GMT-0700 (Pacific Daylight Time)"),
};
let eventCalendar1 = {
	getTitle: '1. 8-9',
	getStartTime: new Date( "Mon Apr 27 2020 08:30:00 GMT-0700 (Pacific Daylight Time)"),
	getEndTime: new Date( "Mon Apr 27 2020 9:00:00 GMT-0700 (Pacific Daylight Time)"),
};
let eventCalendar2 = {
	getTitle: 'chained- skip to 12pm',
	getStartTime: new Date( "Mon Apr 27 2020 11:00:00 GMT-0700 (Pacific Daylight Time)"),
	getEndTime: new Date( "Mon Apr 27 2020 13:00:00 GMT-0700 (Pacific Daylight Time)"),
};
let eventCalendar3 ={
	getTitle: '2. 12-1PM',
	getStartTime: new Date( "Mon Apr 27 2020 13:00:00 GMT-0700 (Pacific Daylight Time)"),
	getEndTime: new Date( "Mon Apr 27 2020 18:00:00 GMT-0700 (Pacific Daylight Time)"),
};
let eventCalendar4 ={
	getTitle: 'chained skip 3-4',
	getStartTime: new Date( "Mon Apr 27 2020 16:00:00 GMT-0700 (Pacific Daylight Time)"),
	getEndTime: new Date( "Mon Apr 27 2020 19:30:00 GMT-0700 (Pacific Daylight Time)")
};

//array that will simulate the calendar booked on Google Calendar
//globals
let calBooked 		= [eventCalendar0, eventCalendar1, eventCalendar2, eventCalendar3, eventCalendar4];
let calBlock 		= [];
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
function chained (){
	// check if there is a value for the +1
	while( i+1 < calBooked.length && calBooked[i].getEndTime.getTime() == calBooked[i + 1].getStartTime.getTime() ){
		i++;
	}
	return i;
};

//create the new blocker event
// function blockEvent() {
// 	cStartTime = cLastEnd;
// 	cEndTime = calBooked[i].getEndTime;
// 	//check chained
// 	cLastEnd = chained(i);
// 	calBlock.push( new newEvent(cStartTime, cEndTime));
// }

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
		cLastEnd = userStartTime;
		i++;
	}
	// last array item start time is less that the user defined end time
	while( calBooked[i].getEndTime < userEndTime) {	
		
		// starts before  8 AM
		if( calBooked[i].getStartTime <= userStartTime) {
			console.log(i);
			//check chain, create start time, end time
			cStartTime = userStartTime;
			cEndTime = chained();
			calBlock.push( new newEvent(cStartTime, cEndTime));
		}
		// booked event starts before end of user defined day
		while( calBooked[i].getStartTime <= userEndTime) {
			console.log("instance " + i +", 1. " + calBooked[i].getStartTime + "is less than or equal " + cLastEnd + i);
			cStartTime = cLastEnd;
			cEndTime = calBooked[i].getStartTime;
			cLastEnd = chained();
			calBlock.push( new newEvent(cStartTime, cEndTime));
			i++;
		}
	}
};
// calBlocker();


//trying a for loop
( function() {
	let cLastEnd 		= null;
	let cStartTime 		= null;
	let cEndTime 		= null;

	//nothing booked
	if(calBooked.length == 0) {
		calBlock.push( new newEvent(userStartTime, userEndTime));
	}

	for ( i; i < calBooked.length; i++) {
			// check if the end time is before 8AM then skip it	
		if ( calBooked[i].getEndTime < userStartTime) {
			cLastEnd = userStartTime;
			i++
		}
		//end of booked entries & less than 
		if(calBooked[i] == calBooked.length){
			// break out of the loop and fill in the time
				// skip this part
				// cStartTime	= cLastEnd;
				// cEndTime	= userEndTime;
				// calBlock.push( new newEvent(cStartTime, cEndTime));
			break;
		}
		
		//starts before userStart (8AM) & ends after userStart (8AM)
		else if( calBooked[i].getStartTime <= userStartTime && calBooked[i].getEndTime > userStartTime) {
			// check for chained i
			chained();
			cStartTime	= calBooked[i].getEndTime;
			cEndTime	= calBooked[i + 1].getStartTime;
			cLastEnd	= calBooked[i + 1].getEndTime;
			i++;
		}
		//starts after userStart (8) & ends before userEnd (5PM)
		else if( calBooked[i].getStartTime > userStartTime) {
			console.log(`instance ${i}, 1. " ${calBooked[i].getStartTime} + "is less than or equal " + ${cLastEnd}`);
			cStartTime = cLastEnd;
			cEndTime = calBooked[i].getStartTime;
			chained();
			cLastEnd = calBooked[i].getEndTime;
		}
		
		//wrap this in a function
		calBlock.push( new newEvent(cStartTime, cEndTime));
		
		//booked is equal or greater than 5PM
		if ( calBooked[i].endTime >= userEndTime ) {
			console.log("check this out");
			cStartTime = cLastEnd;
			cEndTime = calBooked[i].getStartTime;
		}
		//starts before userEnd & ends after
		if ( calBooked[i].getStartTime >= userEndTime && calBooked[i].getEndTime > userEndTime ) {
			console.log(`${i}<- starts before 5 & ends at 5`);
			break;
		}
	}
	if (cLastEnd <= userEndTime){
		console.log("i am out of hte loop check for this");
		cStartTime = cLastEnd;
		cEndTime = userEndTime;
		calBlock.push( new newEvent(cStartTime, cEndTime));
	}
})();