import { RoleModel } from './role.model';
import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Relation,
    JoinTable,
    ManyToMany
} from 'typeorm';
  
@Entity('users')
export class UserModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username?: string;

    @Column({ unique: true, type: 'varchar', length: 100, nullable: true })
    phone?: string;

    @Column()
    email?: string;

    @Column()
    password: string;

    @Column({ unique: true, type: 'varchar', length: 100, nullable: true })
    notification_topic?: string;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    create_at!: Date;

    @UpdateDateColumn()
    update_at!: Date;

    @DeleteDateColumn({ nullable: true })
    delete_at?: Date;

    @ManyToMany(() => RoleModel, (role) => role.users, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION',
    })
    @JoinTable({
        name: 'role_user',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'role_id',
            referencedColumnName: 'id',
        },
    })
    roles: Relation<RoleModel[]>;
}