import { MakeLogicType } from "kea";

interface Values<Type> {
    data: Type;

    endpoint: string | null;

    error: unknown | null;

    isLoading: boolean;
}

interface Actions<Type> {
    setEndpoint: (endpoint: string) => { endpoint: string };

    refresh: () => void;

    succeed: (data: Type) => { data: Type };

    fail: (error: unknown) => { error: unknown };
}

interface Props {
    id: string;
}

export type EndpointDataProviderLogicType<Type> = MakeLogicType<Values<Type>, Actions<Type>, Props>;
