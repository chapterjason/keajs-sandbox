import { MakeLogicType } from "kea";

interface Values<Type> {
    data: Type;
}

interface Actions<Type> {
    set: (data: Type) => { data: Type };
}

interface Props {
    id: string;
}

export type DataProviderLogicType<Type> = MakeLogicType<Values<Type>, Actions<Type>, Props>;
