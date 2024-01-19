import { Model, PrimaryKey } from 'sequelize-typescript';
import { Column, Table, DataType } from 'sequelize-typescript';

export type ListAttributes = {
  cpf: string;
  name: string;
  email: string;
};

@Table({ tableName: 'users' })
export class UserModel extends Model<ListAttributes> {
  @Column({
    type: DataType.INTEGER,
  })
  id: number;

  @PrimaryKey
  @Column
  cpf: string;
  @Column
  name: string;
  @Column
  email: string;
}
