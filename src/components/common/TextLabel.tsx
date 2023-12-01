import { FocusEvent, InputHTMLAttributes, forwardRef, useState } from 'react';
import Text from './Text';
import Input from './Input';

interface TextFeildProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  hasError?: boolean;
  helpMessage?: React.ReactNode;
}

const TextFeild = forwardRef<HTMLInputElement, TextFeildProps>(
  function TextFeild(
    { label, hasError, helpMessage, onFocus, onBlur, ...props },
    ref,
  ) {
    const [focused, setFocused] = useState(false);

    const labelColor = hasError ? 'red' : focused ? 'blue' : 'grey';

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      onFocus?.(event);
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      onBlur?.(event);
    };

    return (
      <div>
        {label ? (
          <Text
            typography="t7"
            color={labelColor}
            display="inlne-block"
            style={{ marginBottom: 6 }}
          >
            {label}
          </Text>
        ) : null}

        <Input
          ref={ref}
          aria-invalid={hasError}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />

        {helpMessage ? (
          <Text
            typography="t7"
            color={labelColor}
            display="inline-block"
            style={{ marginBottom: 6, fontSize: 12 }}
          >
            {helpMessage}
          </Text>
        ) : null}
      </div>
    );
  },
);

export default TextFeild;
