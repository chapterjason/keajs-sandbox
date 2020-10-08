export interface ConverterType<SourceType, TargetType> {
    (sourceData: SourceType): TargetType;
}
