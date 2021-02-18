import { UserTC } from '../models/user.model';

const UserQuery = {
    UserById: UserTC.getResolver('findById'),
    UserByIds: UserTC.getResolver('findByIds'),
    UserAll: UserTC.getResolver('findMany'),
    UserCount: UserTC.getResolver('count'),
};

export { UserQuery };
