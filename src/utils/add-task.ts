const addTask = async (content: string, uid: string) => {
    try {
        const response = await fetch('/api/tasks/add-task', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: content, uid: uid }),
        });

        if (!response.ok) {
            throw new Error('Unable to add task');
        }

        alert('A new tasks created!');

        return response;
    } catch (error) {
        console.error(error);
        throw new Error('There was an error adding the task');
    }
};

export { addTask };