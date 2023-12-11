import { PermissionModel } from './permission.model';
import { UserModel } from './user.model';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    Relation,
    UpdateDateColumn,
} from 'typeorm';
import { RoleName } from '../../domain/entities/role.entity';
  
@Entity({ name: 'roles' })
export class RoleModel {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: RoleName;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at?: Date;

  @ManyToMany(() => PermissionModel, (permission) => permission.roles, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinTable({
    name: 'permission_role',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  permissions: Relation<PermissionModel[]>;

  @ManyToMany(() => UserModel, (user) => user.roles, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  users: Relation<UserModel[]>;
}  