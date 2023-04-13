import Container from '@/src/components/Container';
import Section from '@/src/components/Section';
import Todo from '@/src/components/Todo';

import data from '@/_data/home/en.json';
import fakeData from '@/_data/fakeData.json';

import { DragEvent, useState } from 'react';

export default function HomeScreen() {
    const { titles } = data.main;

    const [tasks, setTasks] = useState(fakeData);

    const getAmount = (taskList: string) =>
        tasks.filter((tasks) => tasks.status === taskList).length;

    const handleOnDrag = (event: DragEvent, id: string) => {
        event.dataTransfer.setData('text/plain', id);
        event.dataTransfer.dropEffect = 'move';
    };

    const handleOnDrop = (event: DragEvent, status: string) => {
        event.preventDefault();

        const id = event.dataTransfer.getData('text/plain');

        const updatedTasks = tasks.map((task) => {
            if (task.id === id) {
                return {
                    ...task,
                    status: status,
                };
            }
            return task;
        });

        setTasks(updatedTasks);
    };

    const handleDragOver = (event: DragEvent) => {
        event.preventDefault();
    };

    return (
        <Container>
            <Section
                title={titles[0]}
                status="todo"
                amount={getAmount(titles[0])}
                onDrop={(e) => handleOnDrop(e, 'todo')}
                onDragOver={(e) => handleDragOver(e)}
            >
                {tasks
                    .filter((task) => task.status === titles[0])
                    .map((task) => (
                        <Todo
                            key={task.id}
                            status="todo"
                            onDragStart={(e) => handleOnDrag(e, task.id)}
                        >
                            {task.content}
                        </Todo>
                    ))}
            </Section>

            <Section
                title={titles[1]}
                status="doing"
                amount={getAmount(titles[1])}
                onDrop={(e) => handleOnDrop(e, 'doing')}
                onDragOver={(e) => handleDragOver(e)}
            >
                {tasks &&
                    tasks
                        .filter((task) => task.status === titles[1])
                        .map((task) => (
                            <Todo
                                key={task.id}
                                status="doing"
                                onDragStart={(e) => handleOnDrag(e, task.id)}
                            >
                                {task.content}
                            </Todo>
                        ))}
            </Section>

            <Section
                title={titles[2]}
                status="done"
                amount={getAmount(titles[2])}
                onDrop={(e) => handleOnDrop(e, 'done')}
                onDragOver={(e) => handleDragOver(e)}
            >
                {tasks &&
                    tasks
                        .filter((task) => task.status === titles[2])
                        .map((task) => (
                            <Todo
                                key={task.id}
                                status="done"
                                onDragStart={(e) => handleOnDrag(e, task.id)}
                            >
                                {task.content}
                            </Todo>
                        ))}
            </Section>
        </Container>
    );
}
