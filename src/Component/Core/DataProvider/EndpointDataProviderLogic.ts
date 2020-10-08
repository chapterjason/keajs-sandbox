import { BuiltLogicAdditions, isBreakpoint, kea } from "kea";
import { EndpointDataProviderLogicType } from "./EndpointDataProviderLogicType";
import Axios from "axios";

export type EndpointDataProviderLogicBuilt<Type> =
    EndpointDataProviderLogicType<Type>
    & BuiltLogicAdditions;

export const EndpointDataProviderLogic = kea<EndpointDataProviderLogicType<unknown>>({
    key: props => props.id,
    actions: {
        setEndpoint: (endpoint) => ({ endpoint }),
        refresh: true,
        succeed: (data) => ({ data }),
        fail: (error) => ({ error }),
    },
    reducers: {
        endpoint: [null, {
            setEndpoint: (_, { endpoint }) => endpoint,
        }],
        data: [null, {
            succeed: (_, { data }) => data,
        }],
        error: [null, {
            fail: (_, { error }) => error,
        }],
        isLoading: [false, {
            refresh: () => true,
            succeed: () => false,
            fail: () => false,
        }],
    },
    listeners: ({ actions, values }) => ({
        setEndpoint: () => {
            actions.refresh();
        },
        refresh: async (_, breakpoint) => {
            if (values.endpoint) {
                try {
                    await breakpoint(100);

                    const response = await Axios.get(values.endpoint);

                    breakpoint();

                    actions.succeed(response.data);
                } catch (error) {
                    if (isBreakpoint(error)) {
                        throw error;
                    }

                    console.error(error);
                    actions.fail(error);
                }
            }
        },
    }),
});
