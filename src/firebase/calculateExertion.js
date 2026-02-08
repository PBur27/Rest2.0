export async function calculateExertion(days, exerciseMuscleData) {
  const exertionTotal = {
    front: {
      head: 0,
      traps: 0,
      shoulders: 0,
      chest: 0,
      lats: 0,
      biceps: 0,
      triceps: 0,
      forearms: 0,
      abs: 0,
      obliques: 0,
      quads: 0,
      calves: 0,
      feet: 0,
    },
    back: {
      head: 0,
      traps: 0,
      shoulders: 0,
      triceps: 0,
      forearms: 0,
      rhomboids: 0,
      lats: 0,
      erectorSpinae: 0,
      obliques: 0,
      glutes: 0,
      hamstrings: 0,
      calves: 0,
      feet: 0,
    },
  };

  const formatValuesForDisplay = (data) => {
    for (const side in data) {
      for (const muscle in data[side]) {
        const val = data[side][muscle];
        data[side][muscle] =
          val >= 0.8 ? 3 : val >= 0.4 ? 2 : val >= 0.2 ? 1 : 0;
      }
    }
  };

  days.sort((a, b) => a.date - b.date);

  for (const day of days) {
    let protein = day.diet.reduce((sum, meal) => sum + meal.protein, 0);
    let sleep = day.sleep[0]?.sleepHours ?? 7;

    const weight = 75;
    const sleepIndex = (1 / (1 + Math.pow(10, -sleep + 7))) * 0.125;
    const dietIndex =
      (1 /
        (1 + Math.pow(100, -(protein === 0 ? 1.2 : protein / weight) + 1.6))) *
      0.125;

    const recovery = Math.max(-0.15 * 0.75 - sleepIndex - dietIndex, -0.33);

    for (const side in exertionTotal) {
      for (const muscle in exertionTotal[side]) {
        exertionTotal[side][muscle] = Math.max(
          0,
          exertionTotal[side][muscle] + recovery,
        );
      }
    }

    for (const exercise of day.exercises) {
      const muscles = exerciseMuscleData[exercise.name];
      const intensity = exercise.intensity / 10;

      for (const muscle of muscles) {
        if (exertionTotal.front[muscle] !== undefined) {
          exertionTotal.front[muscle] = Math.min(
            1,
            exertionTotal.front[muscle] + intensity,
          );
        }
        if (exertionTotal.back[muscle] !== undefined) {
          exertionTotal.back[muscle] = Math.min(
            1,
            exertionTotal.back[muscle] + intensity,
          );
        }
      }
    }
  }

  console.log("calculated exertion total:", exertionTotal);
  const displayValues = structuredClone(exertionTotal);
  formatValuesForDisplay(displayValues);
  return displayValues;
}
