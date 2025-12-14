export const saveProgress = (moduleId: string, completedSteps: number, force: boolean = false) => {
    const current = getProgress(moduleId);
    if (force || completedSteps > current) {
        localStorage.setItem(`module_progress_${moduleId}`, completedSteps.toString());
    }
};

export const getProgress = (moduleId: string): number => {
    const stored = localStorage.getItem(`module_progress_${moduleId}`);
    return stored ? parseInt(stored, 10) : 0;
};

export const clearProgress = (moduleId: string) => {
    localStorage.removeItem(`module_progress_${moduleId}`);
};
