import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { status } from '../../../shared/entity-status.num';
import { User } from '../../user/entities/user.entity';

@Entity('books')
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 500 })
  description: string;

  @ManyToMany((type) => User, (user) => user.books, { eager: true })
  @JoinColumn()
  authors: User[];

  @Column({ type: 'varchar', default: status.ACTIVE, length: 8 })
  status: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
