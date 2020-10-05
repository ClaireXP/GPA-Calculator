function gpa(grades, credits, totalCredits) {
  let weights = assignNumToGrade(grades, credits);
  return totalCredits>0 ? weights.reduce((a, b) => a + b, 0)/totalCredits : 0
}

function averageGrade(gpa) {
  if(Math.abs(gpa-4)<Math.abs(gpa-3.7)) return "A";
  else if(Math.abs(gpa-3.7)<Math.abs(gpa-3.3)) return "A-";
  else if(Math.abs(gpa-3.3)<Math.abs(gpa-3)) return "B+";
  else if(Math.abs(gpa-3)<Math.abs(gpa-2.7)) return "B";
  else if(Math.abs(gpa-2.7)<Math.abs(gpa-2.3)) return "B-";
  else if(Math.abs(gpa-2.3)<Math.abs(gpa-2)) return "C+";
  else if(Math.abs(gpa-2)<Math.abs(gpa-1.7)) return "C";
  else if(Math.abs(gpa-1.7)<Math.abs(gpa-1.3)) return "C-";
  else return "NONE"
}

function cumilativeGPA(f, s, f1, s1, f2, s2, f3, s3) {
  let gpas = [f, s, f1, s1, f2, s2, f3, s3];
  let cumilative = [];
  for (const gpa of gpas) if (gpa != 0) cumilative.push(gpa);
  cumilative.pop();
  return cumilative.length > 0 ? cumilative.reduce((a, b) => a + b, 0)/cumilative.length : "NONE"
}

function predictedGPA(f, s, f1, s1, f2, s2, f3, s3) {
  let gpas = [f, s, f1, s1, f2, s2, f3, s3];
  let cumilative = [];
  for (const gpa of gpas) if (gpa != 0) cumilative.push(gpa);
  return cumilative.reduce((a, b) => a + b, 0)/cumilative.length
}

function awards(cumilative, semester) {
  awards = [];
  if (semester == 0) return "Too Early to Know"
  if (semester >= 3 && cumilative >= 3.5) awards.push("Dean's List");
  if (semester >= 3.5 && cumilative >= 2.0) awards.push("Semester Honors");
  return awards.join(", ")
}

function fyeGPA(coursesF, creditsF, gradesF, coursesS, creditsS, gradesS, springGPA){
  let fall = oneSemFYE(coursesF, creditsF, gradesF);
  if (springGPA!=0) {
    let spring = oneSemFYE(coursesS, creditsS, gradesS);
    return (fall + spring)/2
  }
  else return fall
}

function oneSemFYE(courses, credits, grades) {
  let qualCourses = [];
  let fye = ["MA 165", "MA 166", "MA 161", "MA 162", 
             "PHYS 172", "CHM 115", 
             "CS 159", "CHM 116",
             "BIOL 110", "BIOL 131", "BIOL 121", "BIOL 135", 
             "ENGR 133", "ENGR 131", "ENGR 132", "ENGR 161", "ENGR 162",
             "ENGL 106", "ENGL 108", "COM 114",
             "EPCS 111", "EPCS 121",
             
             "MA165", "MA166", "MA161", "MA162", 
             "PHYS172", "CHM115", 
             "CS159", "CHM116",
             "BIOL110", "BIOL131", "BIOL121", "BIOL135", 
             "ENGR133", "ENGR131", "ENGR132", "ENGR161", "ENGR162",
             "ENGL106", "ENGL108", "COM114",
             "EPCS111", "EPCS121"];
  for (let [index, course] of courses.entries()) { 
    for (let i in fye) if (course==fye[i]) qualCourses.push(index);
  }
    
  let gpa = [], weights = assignNumToGrade(grades, credits); 
  let totalCredits = 0;
  for (const [i, index] of qualCourses.entries()) {
    gpa.push(weights[index]);
    totalCredits += parseInt(credits[index], 10);
  }
  return gpa.reduce((a, b) => a + b, 0)/totalCredits
}

function assignNumToGrade(grades, credits) {
  let weights = []
  for (let i=0; i<grades.length; i++) {
    if (grades[i]=="A") grades[i] = 4;
    else if (grades[i]=="A-") grades[i] = 3.7;
    else if (grades[i]=="B+") grades[i] = 3.3;
    else if (grades[i]=="B") grades[i] = 3;
    else if (grades[i]=="B-") grades[i] = 2.7;
    else if (grades[i]=="C+") grades[i] = 2.3;
    else if (grades[i]=="C") grades[i] = 2;
    else if (grades[i]=="C-") grades[i] = 1.7;
    else grades[i] = 0;
    
    weights.push(grades[i]*credits[i]);
  }
  return weights
}
