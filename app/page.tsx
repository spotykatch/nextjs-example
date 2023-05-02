import { Column, DataSource, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class PostEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  action!: string;
}

const AppDataSource = new DataSource({
  type: 'sqljs',
  location: 'test',
  synchronize: true,
  autoSave: true,
  dropSchema: true,
  entities: [PostEntity]
});

AppDataSource.initialize().then(async (datasource) => {
  const manager = datasource.manager;

  const post = new PostEntity();
  post.action = 'create';
  await manager.save(post);
});

export default function Home() {
  return <main></main>;
}
