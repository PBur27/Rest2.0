import { EXERCISE_DICTIONARY } from './exerciseDictionary';

describe('Exercise Dictionary Integrity', () => {

  //array of valid categories for validation
  const validCategories = ['Legs', 'Push', 'Pull'];
  
  Object.entries(EXERCISE_DICTIONARY).forEach(([id, exercise]) => {
    
      //required properties and their types
    test(`[${id}] has valid structure`, () => {
      expect(exercise).toHaveProperty('name');
      expect(exercise).toHaveProperty('category');
      expect(exercise).toHaveProperty('origin');
      expect(exercise).toHaveProperty('impacts');
      
      
      expect(validCategories).toContain(exercise.category);
      
      //check whether impacts is an object and has at least one muscle group targeted, the impact must be a number between 0 and 1
      expect(typeof exercise.impacts).toBe('object');
      expect(Object.keys(exercise.impacts).length).toBeGreaterThan(0);
      Object.entries(exercise.impacts).forEach(([muscle, multiplier]) => {
         expect(typeof multiplier).toBe('number');
         expect(multiplier).toBeGreaterThan(0);
         expect(multiplier).toBeLessThanOrEqual(1.0); 
      });
    });
  });
});