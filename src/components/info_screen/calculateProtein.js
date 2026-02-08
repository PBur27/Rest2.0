export function calculateProtein(userData) {
  let proteinSumWeek = 0;
  //sum of protein for debugging purposes if needed
  let proteinIntakeArray = [];

  userData.forEach((dataDay) => {
    //dataDays are sorted chronologically
    let proteinSumDay = 0;

    dataDay.diet.forEach((meal) => {
      proteinSumDay += meal.protein;
    });

    proteinSumWeek += proteinSumDay;
    proteinIntakeArray.push(proteinSumDay);
  });

  return proteinIntakeArray;
}
