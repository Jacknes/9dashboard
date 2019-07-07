export type FieldProps<ValueType> = {
    name: string;
    value: ValueType;
    label?: string;
    messages?: Array<FieldMessage>;
    required?: boolean;
    className?: string;
    onChange(name: string, value: ValueType, ...others: Array<any>): any;
    onFocus?(e: React.FocusEvent): void;
    onBlur?(e: React.FocusEvent): void;
    onKeyDown?(e: React.KeyboardEvent): void;
};

export type FieldMessage = {
    type?: FieldMessageType;
    text: string;
};

export type FieldMessageType = 'error' | 'warning' | 'success' | undefined;
