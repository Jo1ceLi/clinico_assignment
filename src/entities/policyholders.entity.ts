import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('policyholders')
export class Policyholders {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  code: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'date' })
  registrationDate: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  introducerCode: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  parentCode: string;

  @Column({ type: 'boolean', nullable: true })
  isLeftChild: boolean;

  @ManyToOne(() => Policyholders, { nullable: true })
  @JoinColumn({ name: 'introducer_code' })
  introducer?: Policyholders;

  @ManyToOne(() => Policyholders, { nullable: true })
  @JoinColumn({ name: 'parent_code' })
  parent?: Policyholders;
}
