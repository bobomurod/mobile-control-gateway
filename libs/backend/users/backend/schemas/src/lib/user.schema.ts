import {Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {UserAccessLevelEnum} from "@mobile-control-gateway/backend/users/backend/enums";

@Schema({
  collection: 'users',
  _id: true,
  timestamps: true,
  versionKey: false,
})
export class UserCollection extends Document {
  _id: string;

  @Prop({
    type: String,
    required: true,
    index: true
  })
  _operatorId: string;

  @Prop({
    type: String,
    required: true,
    index: true,
  })
  phone: string;

  @Prop({
    type: String,
    required: true,
    index: true,
  })
  password: string;

  @Prop({
    type: UserAccessLevelEnum,
    required: true,
    index: true,
    default: UserAccessLevelEnum.USER,
  })
  accessLevel: UserAccessLevelEnum;

  @Prop({
    type: String,
    required: false,
    index: true,
  })
  username?: string;

  @Prop({
    type: String,
    required: false,
    index: false,
  })
  email?: string;

  @Prop({
    type: Number,
    required: false,
    index: true,
  })
  approveCode?: number;

  @Prop({
    type: Date,
    index: true,
    required: false,
  })
  lastLoginDate?: Date;

  @Prop({
    type: Boolean,
    required: true,
    index: true,
    default: false,
  })
  isApproved: boolean;

  @Prop({
    type: Boolean,
    required: true,
    index: true,
    default: true,
  })
  isActive: boolean;

  createdAt: Date;

  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserCollection);
