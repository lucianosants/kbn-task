const deleteTask = async (id: string | undefined, refreshData: () => void) => {
    try {
        const response = await fetch('/api/tasks/delete-task', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });

        if (!response.ok) {
            throw new Error('Unable to delete task');
        }

        if (response.status < 300) {
            refreshData();
        }

        alert('A new tasks deleted!');

        return response;
    } catch (error) {
        console.error(error);
        throw new Error('There was an error deleting the task');
    }
};

export { deleteTask };
