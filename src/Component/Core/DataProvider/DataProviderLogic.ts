import { kea, LogicWrapperAdditions } from "kea";
import { DataProviderLogicType } from "./DataProviderLogicType";

export type DataProviderLogic<Type> = DataProviderLogicType<Type> & LogicWrapperAdditions<DataProviderLogicType<Type>>;

export const DataProviderLogic = kea<DataProviderLogicType<unknown>>({
    actions: {
        set: (data) => ({ data }),
    },
    reducers: {
        data: [null, {
            set: (_, { data }) => data,
        }],
    },
});
