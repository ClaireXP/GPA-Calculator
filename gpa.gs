const FYE = new Set(["MA165","MA166","MA161","MA162", 
             "PHYS172","CHM115",
             "CS159","CHM116",
             "BIOL110","BIOL131","BIOL121","BIOL135", 
             "ENGR133","ENGR131","ENGR132","ENGR161","ENGR162",
             "ENGL106","ENGL108","COM114",
             "EPCS111","EPCS121"]);

const GRADES = {"A":4, "A-":3.7, "B+":3.3,"B":3, "B-":2.7, "C+":2.3, 
                "C":2, "C-":1.7, "D+":1.3, "D":1, "F":0};

function calcSemesterGPA(grades, credits, totalCredits) {
  let weights = [];

  for (let i = 0; i < grades.length; i++) weights.push(GRADES[grades[i]] * credits[i]);

  return GRADES[grades[0]] > 0 ? weights.reduce((a, b) => a + b, 0) / totalCredits : "N/A";
}

function calcIEA(courseStatsFall, courseStatsSpring) {
  let totalCredits = 0;
  let weights = [];

  for (let i = 0; i < courseStatsFall[0].length; i++) {
    if (!FYE.has(courseStatsFall[i][0].replace(" ", ""))) continue;

    let credits = courseStatsFall[i][1];
    weights.push(GRADES[courseStatsFall[i][2]] * credits);
    totalCredits += credits;
  }

  for (let i = 0; i < courseStatsSpring[0].length; i++) {
    if (!FYE.has(courseStatsSpring[i][0].replace(" ", ""))) continue;

    let credits = courseStatsSpring[i][1];
    weights.push(GRADES[courseStatsSpring[i][2]] * credits);
    totalCredits += credits;
  }

  return totalCredits > 0 ? weights.reduce((a, b) => a + b, 0) / totalCredits : "N/A";
}

function calcCumulativeGPA(semStats, current) {
  let totalCredits = 0;
  let weighted = [];

  for (let i = 0; i < semStats.length; i++) {
    if (semStats[0][i + current] == "N/A") break;

    let credits = semStats[1][i];
    weighted.push(semStats[0][i] * credits);
    totalCredits += credits;
  }

  return weighted.length > 0 ? weighted.reduce((a, b) => a + b, 0) / totalCredits : "N/A";
}

function numToLetter(grade) {
  let letter;

  if (grade == "N/A") letter = grade; 
  else {
    if (Math.abs(grade - 4) < Math.abs(grade - 3.7)) letter = "A";
    else if (Math.abs(grade - 3.7) < Math.abs(grade - 3.3)) letter = "A-";
    else if (Math.abs(grade - 3.3) < Math.abs(grade - 3)) letter = "B+";
    else if (Math.abs(grade - 3) < Math.abs(grade - 2.7)) letter = "B";
    else if (Math.abs(grade - 2.7) < Math.abs(grade - 2.3)) letter = "B-";
    else if (Math.abs(grade - 2.3) < Math.abs(grade - 2)) letter = "C+";
    else if (Math.abs(grade - 2) < Math.abs(grade - 1.7)) letter = "C";
    else if (Math.abs(grade - 1.7) < Math.abs(grade - 1.3)) letter = "C-";
    else if (Math.abs(grade - 1.3) < Math.abs(grade - 1)) letter = "D+";
    else if (Math.abs(grade - 1) < Math.abs(grade - .7)) letter = "D";
    else letter = "F";
  }

  return letter;
}

function awards(semesterGPA, cumulativeGPA) {
  let awards = "";

  if (semesterGPA > 3 && cumulativeGPA > 3.5) {
    awards += "Dean's List";

    if (semesterGPA > 3.5 && cumulativeGPA > 2) awards += " & Semester Honors";
  } else if (semesterGPA > 3.5 && cumulativeGPA > 2) awards = "Semester Honors";
  else if (semesterGPA == "N/A") awards = "Too Early to Tell";
  else awards = "None"

  return awards;
}
