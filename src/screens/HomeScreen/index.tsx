import Container from '@/src/components/Container';
import Section from '@/src/components/Section';
import Todo from '@/src/components/Todo';

import data from '@/_data/home/en.json';
import fakeData from '@/_data/fakeData.json';
import { DragEvent } from 'react';

export default function HomeScreen() {
    const { titles } = data.main;

    const getAmount = (taskList: string) =>
        fakeData.filter((tasks) => tasks.status === taskList).length;

    const handleOnDrag = (event: DragEvent, status: string) => {
        console.log(`I'm moving from ${status}`);
    };

    const handleOnDrop = (event: DragEvent, status: string) => {
        console.log(`You dropped me here - ${status}`);
    };

    const handleDragOver = (event: DragEvent, status: string) => {
        event.preventDefault();
    };

    return (
        <Container>
            <Section
                title={titles[0]}
                status="todo"
                amount={getAmount(titles[0])}
                onDrop={(e) => handleOnDrop(e, 'todo')}
                onDragOver={(e) => handleDragOver(e, 'todo')}
            >
                {fakeData &&
                    fakeData
                        .filter((task) => task.status === titles[0])
                        .map((task) => (
                            <Todo
                                key={task.id}
                                status="todo"
                                onDragStart={(e) => handleOnDrag(e, 'todo')}
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
                onDragOver={(e) => handleDragOver(e, 'doing')}
            >
                {fakeData &&
                    fakeData
                        .filter((task) => task.status === titles[1])
                        .map((task) => (
                            <Todo
                                key={task.id}
                                status="doing"
                                onDragStart={(e) => handleOnDrag(e, 'doing')}
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
                onDragOver={(e) => handleDragOver(e, 'done')}
            >
                {fakeData &&
                    fakeData
                        .filter((task) => task.status === titles[2])
                        .map((task) => (
                            <Todo
                                key={task.id}
                                status="done"
                                onDragStart={(e) => handleOnDrag(e, 'done')}
                            >
                                {task.content}
                            </Todo>
                        ))}
            </Section>
        </Container>
    );
}
