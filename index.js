// Your code here
function createEmployeeRecord(row) {
  return {
    firstName: row[0],
    familyName: row[1],
    title: row[2],
    payPerHour: row[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployees(employeeRowData) {
  return employeeRowData.map(function(row) {
    return createEmployeeRecord(row);
  })
}

function createTimeInEvent(employee, dateStamp) {
  let [date, hour] = dateStamp.split(' ');

  employee.timeInEvents.push({
    type: 'TimeIn',
    hour: parseInt(hour, 10),
    date,
  })
  return employee;
}

function createTimeOutEvent(employee, dateStamp) {
  let [date, hour] = dateStamp.split(' ');

  employee.timeOutEvents.push({
    type: 'TimeOut',
    hour: parseInt(hour, 10),
    date,
  })
  return employee;
}

function hoursWorkedOnDate(employee, soughtDate) {
  let inEvent = employee.timeInEvents.find(function(e) {
    return e.date === soughtDate;
  })
  let outEvent = employee.timeOutEvents.find(function(e) {
    return e.date === soughtDate;
  })
  return (outEvent.hour - inEvent.hour) / 100;
}

function wagesEarnedOnDate(employee, dateSought) {
  let rawWage = hoursWorkedOnDate(employee, dateSought) * employee.payPerHour;
  return parseFloat(rawWage.toString());
}

function allWagesFor(employee) {
  let eligibleDates = employee.timeInEvents.map(function(e) {
    return e.date;
  })
  let payable = eligibleDates.reduce(function(memo, d) {
    return memo + wagesEarnedOnDate(employee, d);
  }, 0)
  return payable;
}

function createEmployeeRecords(src) {
  return src.map(function(row) {
    return createEmployeeRecord(row);
  })
}

function findEmployeebyFirstName(srcArray, firstName) {
  return srcArray.find(function(rec) {
    return rec.firstName === firstName;
  })
}

function calculatePayroll(arrayOfEmployeeRecords) {
  return arrayOfEmployeeRecords.reduce(function(memo, rec) {
    return memo + allWagesFor(rec);
  }, 0)
}
