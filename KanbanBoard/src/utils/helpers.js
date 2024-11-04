export const groupTasks = (tasks, groupBy, sortBy) => {
    const grouped = {};
  
    tasks.forEach(task => {
      const key = groupBy === "status" ? task.status
                  : groupBy === "user" ? task.user
                  : task.priority;
  
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(task);
    });
  
    for (const key in grouped) {
      grouped[key].sort((a, b) => {
        if (sortBy === "priority") return b.priority - a.priority;
        if (sortBy === "title") return a.title.localeCompare(b.title);
        return 0;
      });
    }
  
    return grouped;
  };
  