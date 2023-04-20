const moveTask = async (
    id: string,
    status: string,
    refreshData: () => void,
) => {
    try {
        const response = await fetch('/api/tasks/move-task', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, status }),
        });

        if (!response.ok) {
            throw new Error('Unable to update task status');
        }

        if (response.status < 300) {
            refreshData();
        }

        return response;
    } catch (error) {
        console.error(error);
        throw new Error('There was an error updating the task status');
    }
};

export { moveTask };
