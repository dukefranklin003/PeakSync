/* Storage Management */

const STORAGE_KEYS = {
    WORKOUTS: 'antigravity_workouts',
    USER_SETTINGS: 'antigravity_settings',
    STATS: 'antigravity_stats'
};

const DEFAULT_SETTINGS = {
    username: 'Commander',
    theme: 'dark'
};

const Storage = {
    get(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },

    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },

    init() {
        if (!this.get(STORAGE_KEYS.USER_SETTINGS)) {
            this.set(STORAGE_KEYS.USER_SETTINGS, DEFAULT_SETTINGS);
        }
        if (!this.get(STORAGE_KEYS.WORKOUTS)) {
            this.set(STORAGE_KEYS.WORKOUTS, {});
        }
    },

    getWorkouts() {
        return this.get(STORAGE_KEYS.WORKOUTS) || {};
    },

    saveWorkout(date, workoutData) {
        const workouts = this.getWorkouts();
        if (!workouts[date]) {
            workouts[date] = [];
        }
        workouts[date].push(workoutData);
        this.set(STORAGE_KEYS.WORKOUTS, workouts);
    }
};

// Initialize on load
Storage.init();
