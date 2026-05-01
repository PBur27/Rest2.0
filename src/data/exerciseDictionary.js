export const EXERCISE_DICTIONARY = {
  // ==========================================
  // LEGS
  // ==========================================
  barbell_squat: {
    name: "Barbell Squat",
    category: "Legs",
    origin: "default",
    impacts: { quads: 1.0, glutes: 0.6, erector_spinae: 0.4 },
  },
  front_barbell_squat: {
    name: "Front Barbell Squat",
    category: "Legs",
    origin: "default",
    impacts: { quads: 1.0, glutes: 0.5, erector_spinae: 0.3 },
  },
  romanian_deadlift: {
    name: "Romanian Deadlift",
    category: "Legs",
    origin: "default",
    impacts: { hamstrings: 1.0, glutes: 0.8, erector_spinae: 0.6 },
  },
  leg_press: {
    name: "Leg Press",
    category: "Legs",
    origin: "default",
    impacts: { quads: 1.0, glutes: 0.5, hamstrings: 0.3 },
  },
  bulgarian_split_squat: {
    name: "Bulgarian Split Squat",
    category: "Legs",
    origin: "default",
    impacts: { glutes: 0.9, quads: 0.8 },
  },
  leg_extension: {
    name: "Leg Extension",
    category: "Legs",
    origin: "default",
    impacts: { quads: 1.0 },
  },
  lying_leg_curl: {
    name: "Lying Leg Curl",
    category: "Legs",
    origin: "default",
    impacts: { hamstrings: 1.0, calves: 0.2 },
  },
  standing_calf_raise: {
    name: "Standing Calf Raise",
    category: "Legs",
    origin: "default",
    impacts: { calves: 1.0 },
  },
  seated_calf_raise: {
    name: "Seated Calf Raise",
    category: "Legs",
    origin: "default",
    impacts: { calves: 0.9 }, // Targets soleus more specifically
  },
  hip_thrust: {
    name: "Barbell Hip Thrust",
    category: "Legs",
    origin: "default",
    impacts: { glutes: 1.0, hamstrings: 0.4 },
  },
  goblet_squat: {
    name: "Goblet Squat",
    category: "Legs",
    origin: "default",
    impacts: { quads: 0.8, glutes: 0.5, erector_spinae: 0.2 },
  },
  walking_lunges: {
    name: "Walking Lunges",
    category: "Legs",
    origin: "default",
    impacts: { quads: 0.8, glutes: 0.8, hamstrings: 0.4 },
  },

  // ==========================================
  // PULL
  // ==========================================
  dumbbell_bicep_curl: {
    name: "Dumbbell Bicep Curl",
    category: "Pull",
    origin: "default",
    impacts: { biceps: 1.0, forearms: 0.4 },
  },
  barbell_row: {
    name: "Barbell Row",
    category: "Pull",
    origin: "default",
    impacts: { lats: 0.8, rhomboids: 0.8, biceps: 0.4, erector_spinae: 0.4 },
  },
  pull_up: {
    name: "Pull-Up",
    category: "Pull",
    origin: "default",
    impacts: { lats: 1.0, biceps: 0.6, rear_delts: 0.4 },
  },
  lat_pulldown: {
    name: "Lat Pulldown",
    category: "Pull",
    origin: "default",
    impacts: { lats: 1.0, biceps: 0.5, rear_delts: 0.2 },
  },
  seated_cable_row: {
    name: "Seated Cable Row",
    category: "Pull",
    origin: "default",
    impacts: { rhomboids: 1.0, lats: 0.8, biceps: 0.5 },
  },
  face_pull: {
    name: "Face Pull",
    category: "Pull",
    origin: "default",
    impacts: { rear_delts: 1.0, rhomboids: 0.4, traps: 0.2 },
  },
  hammer_curl: {
    name: "Hammer Curl",
    category: "Pull",
    origin: "default",
    impacts: { biceps: 0.8, forearms: 0.8 },
  },
  barbell_shrug: {
    name: "Barbell Shrug",
    category: "Pull",
    origin: "default",
    impacts: { traps: 1.0, forearms: 0.4 },
  },
  t_bar_row: {
    name: "T-Bar Row",
    category: "Pull",
    origin: "default",
    impacts: { rhomboids: 0.9, lats: 0.8, erector_spinae: 0.4, biceps: 0.4 },
  },
  reverse_pec_deck: {
    name: "Reverse Pec Deck",
    category: "Pull",
    origin: "default",
    impacts: { rear_delts: 1.0, rhomboids: 0.6 },
  },

  // ==========================================
  // PUSH
  // ==========================================
  barbell_bench_press: {
    name: "Barbell Bench Press",
    category: "Push",
    origin: "default",
    impacts: { chest: 1.0, front_delts: 0.6, triceps: 0.5 },
  },
  overhead_press: {
    name: "Overhead Press",
    category: "Push",
    origin: "default",
    impacts: { front_delts: 1.0, side_delts: 0.8, triceps: 0.8},
  },
  incline_dumbbell_press: {
    name: "Incline Dumbbell Press",
    category: "Push",
    origin: "default",
    impacts: { chest: 1.0, front_delts: 0.6, triceps: 0.4 },
  },
  dumbbell_lateral_raise: {
    name: "Dumbbell Lateral Raise",
    category: "Push",
    origin: "default",
    impacts: { side_delts: 1.0, traps: 0.3 },
  },
  tricep_rope_pushdown: {
    name: "Tricep Rope Pushdown",
    category: "Push",
    origin: "default",
    impacts: { triceps: 1.0 },
  },
  overhead_tricep_extension: {
    name: "Overhead Tricep Extension",
    category: "Push",
    origin: "default",
    impacts: { triceps: 1.0 }, // Emphasizes the long head
  },
  dips: {
    name: "Parallel Bar Dips",
    category: "Push",
    origin: "default",
    impacts: { pecs: 0.8, triceps: 0.9, front_delts: 0.5 },
  },
  machine_chest_press: {
    name: "Machine Chest Press",
    category: "Push",
    origin: "default",
    impacts: { chest: 1.0, front_delts: 0.5, triceps: 0.4 },
  },
  pec_deck_fly: {
    name: "Pec Deck Fly",
    category: "Push",
    origin: "default",
    impacts: { chest: 1.0, front_delts: 0.2 },
  },
  skull_crushers: {
    name: "Skull Crushers",
    category: "Push",
    origin: "default",
    impacts: { triceps: 1.0 },
  },
};
