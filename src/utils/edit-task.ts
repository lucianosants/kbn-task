const editTask = async (
    id: string,
    content: string,
    refreshData: () => void,
) => {
    try {
        const response = await fetch('/api/tasks/edit-task', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, content }),
        });

        if (!response.ok) {
            throw new Error('Unable to edit task status');
        }

        if (response.status < 300) {
            refreshData();
        }

        return response;
    } catch (error) {
        console.error(error);
        throw new Error('There was an error editing the task status');
    }
};

export { editTask };
