import { UserWasCreatedProjection } from './user-was-created.projection';
import { UserWasPromotedProjection } from './user-was-promoted.projection';

export const ProjectionHandlers = [
  UserWasCreatedProjection,
  UserWasPromotedProjection,
];
