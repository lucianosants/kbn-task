const addTask = async (
    content: string,
    refreshData: () => void,
    uid?: string,
) => {
    try {
        const response = await fetch('/api/tasks/add-task', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: content, uid: uid }),
        });

        if (!response.ok) {
            throw new Error('Unable to add task');
        }

        if (response.status < 300) {
            refreshData();
        }

        alert('A new tasks created!');

        return response;
    } catch (error) {
        console.error(error);
        throw new Error('There was an error adding the task');
    }
};

export { addTask };
