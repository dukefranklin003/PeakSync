/* Exercise Database */

const EXERCISES_DB = [
    // Chest
    { id: 'chest_1', name: 'Push-ups', category: 'Chest', difficulty: 'Easy' },
    { id: 'chest_2', name: 'Bench Press', category: 'Chest', difficulty: 'Medium' },
    { id: 'chest_3', name: 'Incline Dumbbell Press', category: 'Chest', difficulty: 'Medium' },
    { id: 'chest_4', name: 'Cable Flys', category: 'Chest', difficulty: 'Hard' },

    // Back
    { id: 'back_1', name: 'Pull-ups', category: 'Back', difficulty: 'Hard' },
    { id: 'back_2', name: 'Deadlift', category: 'Back', difficulty: 'Extreme' },
    { id: 'back_3', name: 'Bent Over Rows', category: 'Back', difficulty: 'Medium' },
    { id: 'back_4', name: 'Lat Pulldowns', category: 'Back', difficulty: 'Easy' },

    // Legs
    { id: 'legs_1', name: 'Squats', category: 'Legs', difficulty: 'Hard' },
    { id: 'legs_2', name: 'Lunges', category: 'Legs', difficulty: 'Medium' },
    { id: 'legs_3', name: 'Leg Press', category: 'Legs', difficulty: 'Medium' },
    { id: 'legs_4', name: 'Calf Raises', category: 'Legs', difficulty: 'Easy' },

    // Shoulders
    { id: 'shldr_1', name: 'Overhead Press', category: 'Shoulders', difficulty: 'Hard' },
    { id: 'shldr_2', name: 'Lateral Raises', category: 'Shoulders', difficulty: 'Easy' },

    // Core
    { id: 'core_1', name: 'Plank', category: 'Core', difficulty: 'Medium' },
    { id: 'core_2', name: 'Crunches', category: 'Core', difficulty: 'Easy' },

    // Cardio
    { id: 'cardio_1', name: 'Running', category: 'Cardio', difficulty: 'Medium' },
    { id: 'cardio_2', name: 'Jump Rope', category: 'Cardio', difficulty: 'Hard' }
];

const Exercises = {
    getAll() {
        return EXERCISES_DB;
    },

    getByCategory(category) {
        return EXERCISES_DB.filter(ex => ex.category === category);
    }
};
