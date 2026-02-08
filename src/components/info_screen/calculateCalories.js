export function calculateCalories(userData) {
  let calorieSumWeek = 0;
  //sum of calories for debugging purposes if needed
  let calorieIntakeArray = [];

  userData.forEach((dataDay) => {
    //dataDays are sorted chronologically
    let calorieSumDay = 0;

    dataDay.diet.forEach((meal) => {
      calorieSumDay += meal.calories;
    });

    calorieSumWeek += calorieSumDay;
    calorieIntakeArray.push(calorieSumDay);
  });

  return calorieIntakeArray;
}
