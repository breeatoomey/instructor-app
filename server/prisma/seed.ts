import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const lessonData: Prisma.LessonCreateInput[] = [
    {
        id: '123',
        title: 'variables'
    },
    {
        id: '456',
        title: 'iteration'
    },
    {
        id: '789',
        title: 'recursion'
    },
];

const classroomData: Prisma.ClassroomCreateInput[] = [
    {
        id: '123',
        name: 'CMSI 2120'
    }
]

async function main() {
    console.log(`Start seeding ...`);
    for (const l of lessonData) {
        const lesson = await prisma.lesson.upsert({
            where: { id: l.id },
            create: l,
            update: {},
        });
        console.log(`Upserted Lesson with id: ${lesson.id}`);
    }
    for (const c of classroomData) {
        const classroom = await prisma.classroom.upsert({
            where: { id: c.id },
            create: c,
            update: {},
        });
        console.log(`Upserted Classroom with id: ${classroom.id}`);
    }
    console.log(`Seeding finished.`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });