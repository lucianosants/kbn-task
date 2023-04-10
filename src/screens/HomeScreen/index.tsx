import Container from '@/src/components/Container';
import Section from '@/src/components/Section';
import Todo from '@/src/components/Todo';

import data from '@/_data/home/en.json';
import fakeData from '@/_data/fakeData.json';

export default function HomeScreen() {
    const { titles } = data.main;

    const getAmount = (taskList: string) =>
        fakeData.filter((tasks) => tasks.status === taskList).length;

    return (
        <Container>
            <Section
                title={titles[0]}
                status="todo"
                amount={getAmount(titles[0])}
            >
                {fakeData &&
                    fakeData
                        .filter((task) => task.status === titles[0])
                        .map((task) => (
                            <Todo key={task.id} status="todo">
                                {task.content}
                            </Todo>
                        ))}
            </Section>

            <Section
                title={titles[1]}
                status="doing"
                amount={getAmount(titles[1])}
            >
                {fakeData &&
                    fakeData
                        .filter((task) => task.status === titles[1])
                        .map((task) => (
                            <Todo key={task.id} status="doing">
                                {task.content}
                            </Todo>
                        ))}
            </Section>

            <Section
                title={titles[2]}
                status="done"
                amount={getAmount(titles[2])}
            >
                {fakeData &&
                    fakeData
                        .filter((task) => task.status === titles[2])
                        .map((task) => (
                            <Todo key={task.id} status="done">
                                {task.content}
                            </Todo>
                        ))}
            </Section>
        </Container>
    );
}
