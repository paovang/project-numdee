import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
    Relation,
    UpdateDateColumn,
  } from 'typeorm';
  import {
    Permission,
    PermissionType,
  } from '../../domain/entities/permission.entity';
  import { RoleModel } from './role.model';
  
  @Entity({ name: 'permissions' })
  export class PermissionModel {
    @PrimaryGeneratedColumn({ unsigned: true })
    id!: number;
  
    @Column({ type: 'varchar', length: 50, unique: true })
    name!: Permission;
  
    @Column({ type: 'text', nullable: true })
    description?: string;
  
    @Column({ type: 'varchar', length: 50 })
    type!: PermissionType;
  
    @Column({ type: 'varchar', length: 100 })
    display_name!: string;
  
    @ManyToMany(() => RoleModel, (role) => role.permissions, {
      onDelete: 'CASCADE',
      onUpdate: 'NO ACTION',
    })
    roles: Relation<RoleModel[]>;
  
    @CreateDateColumn()
    created_at!: Date;
  
    @UpdateDateColumn()
    updated_at!: Date;
  
    @DeleteDateColumn({ nullable: true })
    deleted_at?: Date;
}  