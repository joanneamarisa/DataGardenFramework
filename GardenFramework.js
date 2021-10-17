let table, totalRows, date, today;

let y = 0;

let JoCount = 0;
let StefCount = 0;

function preload() {
  table = loadTable('data/StefData4.csv', 'csv', 'header');
}

function setup() {
  totalRows = table.getRowCount();
  today = date;
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(200);

  // ground
  let Ground = windowHeight - 30;
  fill(0);
  rect(0, Ground, windowWidth, windowHeight);

  // 'for' loop for reaading our data by row
  for (let i=0; i < totalRows; i++) {
    date = table.getString(i, "DATE");
    
    // positions for leaves and flowers
    let datePos = map(date, 6, 31, 100, width-100);
    let flowerPos = map(today, 6, 31, 100, width-100);
   
     // 'if' function for what happens when we reach top of stem
    if (today!=date) {
      fill("red");
      let flowerY = map((Ground-y), Ground-745, Ground, 30, Ground);

      ellipse(flowerPos, flowerY, 30, 30);
      
      if (JoCount >= (JoCount+StefCount)/2) {
         fill("white");
         ellipse(flowerPos, flowerY, 20, 20);
      } else if (StefCount >= (JoCount+StefCount)/2) {
        fill("black");
        ellipse(flowerPos, flowerY, 20, 20);
      } else if (JoCount == StefCount) {
        fill("blue");
        ellipse(flowerPos, flowerY, 30, 30);
      }
            
      y = 0;
      JoCount = 0;
      StefCount = 0;
      today = date;
    }

    // 'growth' for when text messages continue
    today = date;
    y += 5;

    // date labels
    let stemLength = Ground - y;
    let newStem = map(stemLength, Ground-745, Ground, 30, Ground);
    console.log(stemLength + "/" + newStem);

    fill("white");
    text(date, datePos, Ground);
    
    // stems
    stroke("blue");
    line(datePos, Ground, datePos, newStem);

    // leaves
    stroke(0);
    let Person = table.get(i, "SENDER");

    if (Person === "Joanne Amarisa") {
      fill("yellow");
      ellipse (datePos, newStem, 8, 8);
      JoCount++;
      
      // hover function
      
      var Jo = {
    x: datePos,
    y: stemLength,
    diameter: 10
  }
  
  if (mouseX >= Jo.x - 5 && mouseX <= Jo.x + 5 && mouseY >= Jo.y - 5 && mouseY <= Jo.y + 5) {
  textHoverJo();
  }
    } else if (Person === "Stefeny Cheng") {
      fill("orange");
      ellipse(datePos, newStem, 8, 8);
      StefCount++;
      
      var Stef = {
    x: datePos,
    y: stemLength,
    diameter: 10
  }
  
  if (mouseX >= Stef.x - 5 && mouseX <= Stef.x + 5 && mouseY >= Stef.y - 5 && mouseY <= Stef.y + 5) {
  textHoverStef();
  }
  
  }

  //end of 'for' loop
  }
//end of draw

}

function textHoverJo() {
  text("message about Person 1", mouseX, mouseY);
}

function textHoverStef() {
  text("message about Person 2", mouseX, mouseY);
}
