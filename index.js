// 2 days out - loop through this function 2x
let nextWorkDay;

function workWeekday(){	
	//get todays date
	let today = new Date();
	//get tomorrow, script needs 2 days out
	let tDate = new Date(today);
	// set tDate to tomorrow
	tDate.setDate(tDate.getDate() + 1);
	
	switch(tDate.getDay()){
		  // Sunday - Saturday : 0 - 6 
		case 0:
			//Sun -> Tues = 2
			// nextWorkDay = new Date(tDate.setDate(tDate.getDate() +1));
			// break;
		case 1:
			//Mon -> Wed = 2
		case 2:
			//Tues ->Thurs = 2
		case 3:
			// Wed -> Fri = 2
		case 4:
			nextWorkDay = new Date(tDate.setDate(tDate.getDate() +1));
			// console.log("Next work day: " + nextWorkDay.getDay());
			break;
			// Thurs -> Mon = 3
		case 5:
			// Fri -> Tues = 4
			nextWorkDay = new Date(tDate.setDate(tDate.getDate() +1));
			// console.log("fri: " + nextWorkDay.getDay());
				
		case 6: 
			// Sat -> Tues
			nextWorkDay = new Date(tDate.setDate(tDate.getDate() +2));
			// console.log("Sat: " + nextWorkDay.getDay() + " weekend scenario. Next work day: " + nextWorkDay.getDate());
	}
	return nextWorkDay;
}
workWeekday();

//get an array of events from the next work day
function getEvents() {
/* 	1. Get the next work day
	2. Get all the events from that day
	3. fill in the gaps
	4. log the additions
	5. Repeat 1-4 for the following workday
*/
}

let eventCalendar0 = {
	getTitle: 'skip 5:30-6:30',
	getStartTime: new Date( 'Mon Apr 27 2020 06:30:00 GMT-0700 (Pacific Daylight Time)'),
	getEndTime: new Date( "Mon Apr 27 2020 07:30:00 GMT-0700 (Pacific Daylight Time)"),
};
let eventCalendar1 = {
	getTitle: '1. 8-9',
	getStartTime: new Date( "Mon Apr 27 2020 09:30:00 GMT-0700 (Pacific Daylight Time)"),
	getEndTime: new Date( "Mon Apr 27 2020 10:00:00 GMT-0700 (Pacific Daylight Time)"),
};
let eventCalendar2 = {
	getTitle: 'chained- skip to 12pm',
	getStartTime: new Date( "Mon Apr 27 2020 11:00:00 GMT-0700 (Pacific Daylight Time)"),
	getEndTime: new Date( "Mon Apr 27 2020 13:00:00 GMT-0700 (Pacific Daylight Time)"),
};
let eventCalendar3 ={
	getTitle: '2. 12-1PM',
	getStartTime: new Date( "Mon Apr 27 2020 13:00:00 GMT-0700 (Pacific Daylight Time)"),
	getEndTime: new Date( "Mon Apr 27 2020 14:00:00 GMT-0700 (Pacific Daylight Time)"),
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
let userStartTime   = new Date(nextWorkDay.setHours(08, 00, 00));
let userEndTime 	= new Date(nextWorkDay.setHours(17, 00, 00));
let i 				= 0;

//objects that will be pushed into the calendar
class newEvent {
	constructor(st, sp) {
		this.title = "Admin - Don't Block: Update this to a user input";
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


// Loop through the booked Array. Stop when past userEndTime
( function() {
	let cLastEnd 		= userStartTime;
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
		//consolidate breaks
		//end of booked entries & less than 
		if(	calBooked[i] == calBooked.length || 		
			//booked is equal or greater than 5PM
			cLastEnd >= userEndTime ) {
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
	}
	if (cLastEnd <= userEndTime){
		console.log("i am out of the loop check for this");
		cStartTime = cLastEnd;
		cEndTime = userEndTime;
		calBlock.push( new newEvent(cStartTime, cEndTime));
	}
})();