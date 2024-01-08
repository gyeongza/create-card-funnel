import { css } from '@emotion/react';
import FixedBottomButton from '../common/FixedBottomButton';
import Flex from '../common/Flex';
import TextFeild from '../common/TextLabel';
import Spacing from '../common/Spacing';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { FormValues } from '@/models/signup';
import validator from 'validator';

interface FormProps {
  onSubmit: (formValues: FormValues) => void;
}

function Form({ onSubmit }: FormProps) {
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
    rePassword: '',
    name: '',
  });

  const [dirty, setDirty] = useState<Partial<FormValues>>({});

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDirty((prevDirty) => ({ ...prevDirty, [e.target.name]: 'true' }));
  }, []);

  const errors = useMemo(() => validate(formValues), [formValues]);

  const 제출가능한상태인가 = Object.keys(errors).length === 0;

  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextFeild
        label="이메일"
        placeholder="example@example.com"
        value={formValues.email}
        onChange={handleFormValues}
        name="email"
        hasError={Boolean(dirty.email) && Boolean(errors.email)}
        // eslint-disable-next-line no-extra-boolean-cast
        helpMessage={Boolean(dirty.email) ? errors.email : ''}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextFeild
        label="비밀번호"
        type="password"
        value={formValues.password}
        onChange={handleFormValues}
        name="password"
        hasError={Boolean(dirty.password) && Boolean(errors.password)}
        // eslint-disable-next-line no-extra-boolean-cast
        helpMessage={Boolean(dirty.password) ? errors.password : ''}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextFeild
        label="비밀번호 재확인"
        type="password"
        value={formValues.rePassword}
        onChange={handleFormValues}
        name="rePassword"
        hasError={Boolean(dirty.rePassword) && Boolean(errors.rePassword)}
        // eslint-disable-next-line no-extra-boolean-cast
        helpMessage={Boolean(dirty.rePassword) ? errors.rePassword : ''}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextFeild
        label="이름"
        placeholder="박경현"
        value={formValues.name}
        onChange={handleFormValues}
        name="name"
        hasError={Boolean(dirty.name) && Boolean(errors.name)}
        // eslint-disable-next-line no-extra-boolean-cast
        helpMessage={Boolean(dirty.name) ? errors.name : ''}
        onBlur={handleBlur}
      />

      <FixedBottomButton
        disabled={제출가능한상태인가 === false}
        label="회원가입"
        onClick={() => {
          onSubmit(formValues);
        }}
      />
    </Flex>
  );
}

const formContainerStyles = css`
  padding: 24px;
`;

function validate(formValues: FormValues) {
  // eslint-disable-next-line prefer-const
  let errors: Partial<FormValues> = {};

  if (validator.isEmail(formValues.email) === false) {
    errors.email = '이메일 형식을 확인해주세요.';
  }

  if (formValues.password.length < 8) {
    errors.password = '비밀번호는 8글자 이상 입력해주세요';
  }

  if (formValues.rePassword.length < 8) {
    errors.rePassword = '비밀번호는 8글자 이상 입력해주세요';
  } else if (
    validator.equals(formValues.password, formValues.rePassword) === false
  ) {
    errors.rePassword = '비밀번호를 확인해주세요.';
  }

  if (formValues.name.length < 2) {
    errors.name = '이름은 2글자 이상 입력해주세요.';
  }

  return errors;
}

export default Form;
